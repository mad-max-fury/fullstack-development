import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { mixins } from '../../../styles/mixins';
import { getColor } from '../typography';
import { ElementProps } from './type';

/**
 * Base styles for the `Element` component.
 * Includes typography, spacing, size, flex, background, and utility mixins.
 */
export const elementStyles = css<ElementProps>`
  ${({ theme, variant }) =>
    variant &&
    css`
      ${theme.typography.presets[variant]}
    `}

  ${({ color, theme }) =>
    color &&
    css`
      color: ${getColor(color)(theme)};
    `}

  ${({ backgroundColor, theme }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor && getColor(backgroundColor)(theme)};
    `}

  // Spacing mixins
  ${({ p }) => p && mixins.spacing.p(p)}
  ${({ px }) => px && mixins.spacing.px(px)}
  ${({ py }) => py && mixins.spacing.py(py)}
  ${({ pt }) => pt && mixins.spacing.pt(pt)}
  ${({ pr }) => pr && mixins.spacing.pr(pr)}
  ${({ pb }) => pb && mixins.spacing.pb(pb)}
  ${({ pl }) => pl && mixins.spacing.pl(pl)}
  ${({ m }) => m && mixins.spacing.m(m)}
  ${({ mx }) => mx && mixins.spacing.mx(mx)}
  ${({ my }) => my && mixins.spacing.my(my)}
  ${({ mt }) => mt && mixins.spacing.mt(mt)}
  ${({ mr }) => mr && mixins.spacing.mr(mr)}
  ${({ mb }) => mb && mixins.spacing.mb(mb)}
  ${({ ml }) => ml && mixins.spacing.ml(ml)}

  // Size mixins
  ${({ w }) => w && mixins.size.w(w)}
  ${({ h }) => h && mixins.size.h(h)}
  ${({ minW }) => minW && mixins.size.minW(minW)}
  ${({ maxW }) => maxW && mixins.size.maxW(maxW)}
  ${({ minH }) => minH && mixins.size.minH(minH)}
  ${({ maxH }) => maxH && mixins.size.maxH(maxH)}

  // Flex mixins
  ${({ flexCenter }) => flexCenter && mixins.flex.center}
  ${({ flexBetween }) => flexBetween && mixins.flex.between}
  ${({ flexAround }) => flexAround && mixins.flex.around}
  ${({ flexColumn }) => flexColumn && mixins.flex.column}
  ${({ flexColumnCenter }) => flexColumnCenter && mixins.flex.columnCenter}

  // Typography mixins
  ${({ lineClamp }) => lineClamp && mixins.typography.lineClamp(lineClamp)}
  ${({ responsiveFontSize }) =>
    responsiveFontSize &&
    mixins.typography.responsive(
      responsiveFontSize.min,
      responsiveFontSize.max,
    )}

  // Background mixins
  ${({ backgroundCover }) => backgroundCover && mixins.background.cover}
  ${({ backgroundContain }) => backgroundContain && mixins.background.contain}
  ${({ backgroundGradient }) =>
    backgroundGradient &&
    mixins.background.gradient(
      backgroundGradient.direction,
      ...backgroundGradient.colors,
    )}

  // Utility mixins
  ${({ transition }) =>
    transition &&
    mixins.utils.transition(
      transition.properties,
      transition.duration,
      transition.timing,
    )}
  ${({ boxShadow }) => boxShadow && mixins.utils.boxShadow(boxShadow)}
  ${({ border }) =>
    border && mixins.utils.border(border.width, border.style, border.color)}
  ${({ borderRadius }) =>
    borderRadius && mixins.utils.borderRadius(borderRadius)}
  ${({ resetList }) => resetList && mixins.utils.resetList}
  ${({ visuallyHidden }) => visuallyHidden && mixins.utils.visuallyHidden}
`;

/**
 * Styled component for the `Element`.
 * Applies the `elementStyles` and allows dynamic rendering of HTML elements.
 */
const StyledElement = styled.div<ElementProps>`
  ${elementStyles}
`;

/**
 * A flexible and reusable component for rendering HTML elements with styled-system-like props.
 * Supports typography, spacing, sizing, flexbox, backgrounds, and more.
 * Also includes accessibility features like ARIA attributes and role management.
 *
 * @example
 * ```jsx
 * <El as="section" ariaLabel="Main Content" role="region">
 *   <h1>Welcome to the Main Content</h1>
 *   <p>This is a paragraph inside a section.</p>
 * </El>
 * ```
 */
export const El = forwardRef<HTMLElement, ElementProps>(
  (
    {
      as = 'div',
      children,
      ariaLabel,
      ariaLabelledby,
      ariaDescribedby,
      role,
      tabIndex,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledElement
        ref={ref}
        as={as}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        tabIndex={tabIndex}
        {...props}
      >
        {children}
      </StyledElement>
    );
  },
);

El.displayName = 'Element';

export * from './type';
