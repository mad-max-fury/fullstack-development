import { keyframes } from 'styled-components';

type SlideInOptions = {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  distance?: string;
};

type RotateOptions = {
  degrees?: number;
};

type MarqueeOptions = {
  marqueeDistance?: string;
};

type AnimationOptions = SlideInOptions | RotateOptions | MarqueeOptions;

/**
 * Utility function to generate keyframes for common animations.
 * @param {string} type - The type of animation (e.g., 'fadeIn', 'slideIn', 'rotate', etc.).
 * @param {object} options - Custom options for the animation (e.g., direction, distance, etc.).
 * @returns  A keyframes object for use in styled-components.
 */
const createAnimation = (type: string, options?: AnimationOptions) => {
  switch (type) {
    case 'fadeIn':
      return keyframes`
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      `;

    case 'slideIn': {
      const { direction = 'left', distance = '100%' } = options as SlideInOptions;
      const translateProperty =
        direction === 'left' || direction === 'right' ? 'translateX' : 'translateY';
      const translateValue =
        direction === 'left' || direction === 'top' ? `-${distance}` : distance;

      return keyframes`
        from {
          transform: ${translateProperty}(${translateValue});
        }
        to {
          transform: ${translateProperty}(0);
        }
      `;
    }

    case 'rotate': {
      const { degrees = 360 } = options as RotateOptions;
      return keyframes`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(${degrees}deg);
        }
      `;
    }

    case 'spinner':
      return keyframes`
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      `;

    case 'marquee': {
      const { marqueeDistance = '100%' } = options as MarqueeOptions;
      return keyframes`
        0% {
          transform: translateX(${marqueeDistance});
        }
        100% {
          transform: translateX(-${marqueeDistance});
        }
      `;
    }

    default:
      throw new Error(`Unknown animation type: ${type}`);
  }
};

// Predefined animations for ease of use
export const animations = {
  fadeIn: createAnimation('fadeIn'),
  slideInFromLeft: createAnimation('slideIn', { direction: 'left' }),
  slideInFromRight: createAnimation('slideIn', { direction: 'right' }),
  slideInFromTop: createAnimation('slideIn', { direction: 'top' }),
  slideInFromBottom: createAnimation('slideIn', { direction: 'bottom' }),
  rotate: createAnimation('rotate'),
  spinner: createAnimation('spinner'),
  marquee: createAnimation('marquee'),
};