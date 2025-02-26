import { ElementType, ReactNode } from 'react';

import { MixinProps } from '../../../styles/mixins';
import { theme } from '../../../styles/theme';
import { TypographyColors } from '../typography';

/**
 * Valid HTML elements that can have children.
 * Excludes self-closing elements like `input`, `img`, etc.
 */
type ValidHTMLElements =
  | 'div'
  | 'section'
  | 'article'
  | 'main'
  | 'aside'
  | 'header'
  | 'footer'
  | 'nav'
  | 'form'
  | 'ul'
  | 'ol'
  | 'li'
  | 'p'
  | 'span'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'a'
  | 'button'
  | 'label'
  | 'figure'
  | 'figcaption'
  | 'blockquote'
  | 'table'
  | 'thead'
  | 'tbody'
  | 'tr'
  | 'td'
  | 'th';

/**
 * Props for the `Element` component.
 * Extends `MixinProps` to include all mixin-related props.
 */
export interface ElementProps extends MixinProps {
  /** The HTML element or React component to render. Defaults to `'div'`. */
  as?: ValidHTMLElements | ElementType;
  /** The children to render inside the element. */
  children?: ReactNode;
  /** Typography variant from the theme. */
  variant?: keyof typeof theme.typography.presets;
  /** Text color. Can be a theme color key (e.g., `B500`) or a custom color value. */
  color?: TypographyColors;
  /** Background color. Can be a theme color key (e.g., `B500`) or a custom color value. */
  backgroundColor?: TypographyColors;
  /** Additional class name for custom styling. */
  className?: string;
  /** ARIA role for accessibility. */
  role?: string;
  /** ARIA label for accessibility. */
  ariaLabel?: string;
  /** ARIA labelledby for accessibility. */
  ariaLabelledby?: string;
  /** ARIA describedby for accessibility. */
  ariaDescribedby?: string;
  /** Tab index for focus management. */
  tabIndex?: number;
}
