import React from 'react';
import styled, { css } from 'styled-components';
import {
  ExtendedTypographyProps,
  TypographyColors,
  TypographyFontWeight,
  TypographyVariant,
  variantMapping,
} from './types';
import { mixins } from '../../../styles/mixins';

export const getColor = (color: TypographyColors) => {
  const colorMap = {
    // Beige
    B500: 'beige.500',
    B100: 'beige.100',
    // Slate
    S600: 'slate.600',
    // Grey
    G900: 'grey.900',
    G500: 'grey.500',
    G300: 'grey.300',
    G100: 'grey.100',
    // Secondary
    SGreen: 'secondary.green',
    SYellow: 'secondary.yellow',
    SCyan: 'secondary.cyan',
    SNavy: 'secondary.navy',
    SPurple: 'secondary.purple',
    SRed: 'secondary.red',
    // Other
    OPurple: 'other.purple',
    OTurquoise: 'other.turquoise',
    OBrown: 'other.brown',
    OMagenta: 'other.magenta',
    OBlue: 'other.blue',
    ONavyGrey: 'other.navyGrey',
    OArmyGreen: 'other.armyGreen',
    OGold: 'other.gold',
    OOrange: 'other.orange',
    BG: 'other.bg',
    // White
    white: 'white',
  };
  return (theme: any) => {
    const [category, shade] = colorMap[color]?.split('.') || [];
    return shade ? theme.colors[category][shade] : theme.colors[category];
  };
};



const getTypographyStyle = (variant: TypographyVariant) => {
  return (theme: any) => {
    const preset = theme.typography.presets[variantMapping[variant] || 'body1'];
    return css`
      font-family: ${preset.fontFamily};
      font-size: ${preset.fontSize};
      line-height: ${preset.lineHeight};
      letter-spacing: ${preset.letterSpacing};
    `;
  };
};

const getFontWeight = (weight: TypographyFontWeight) => {
  const weightMap = {
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  };
  return weightMap[weight] || 400;
};

const baseStyles = css<ExtendedTypographyProps>`
  ${({ variant, theme }) => variant && getTypographyStyle(variant)(theme)}

  ${({ color, theme }) =>
    color &&
    css`
      color: ${getColor(color)(theme)};
    `}

  ${({ theme, backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor && getColor(backgroundColor)(theme)};
    `}

  ${({ fontWeight }) =>
    fontWeight &&
    css`
      font-weight: ${getFontWeight(fontWeight)};
    `}

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  ${({ noWrap }) => noWrap && mixins.typography.truncate}

  ${({ underline }) => {
    switch (underline) {
      case 'always':
        return css`
          text-decoration: underline;
        `;
      case 'hover':
        return css`
          &:hover {
            text-decoration: underline;
          }
        `;
      default:
        return css`
          text-decoration: none;
        `;
    }
  }}

  ${({ gutterBottom, theme }) =>
    gutterBottom &&
    css`
      margin-bottom: ${theme.spacing[200]};
    `}

  ${({ flexCenter }) => flexCenter && mixins.flex.center}
  ${({ flexBetween }) => flexBetween && mixins.flex.between}
  ${({ flexAround }) => flexAround && mixins.flex.around}
  ${({ flexColumn }) => flexColumn && mixins.flex.column}
  ${({ flexColumnCenter }) => flexColumnCenter && mixins.flex.columnCenter}
  ${({ textTruncateLines }) =>
    textTruncateLines && mixins.typography.lineClamp(textTruncateLines)}
  ${({ resetList }) => resetList && mixins.utils.resetList}
  ${({ absoluteFill }) => absoluteFill && mixins.position.fill}
  ${({ fixedFill }) => fixedFill && mixins.position.fixed()}
  ${({ responsiveGrid }) =>
    responsiveGrid &&
    mixins.grid.responsive(responsiveGrid.minWidth, responsiveGrid.gap)}
  ${({ transition }) =>
    transition &&
    mixins.utils.transition(
      transition.properties,
      transition.duration,
      transition.timing
    )}
  ${({ boxShadow }) => boxShadow && mixins.utils.boxShadow(boxShadow)}
  ${({ border }) =>
    border && mixins.utils.border(border.width, border.style, border.color)}
  ${({ borderRadius }) => borderRadius && mixins.utils.borderRadius(borderRadius)}
  ${({ visuallyHidden }) => visuallyHidden && mixins.utils.visuallyHidden}

  // Additional mixins for spacing, size, and background
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

  ${({ w }) => w && mixins.size.w(w)}
  ${({ h }) => h && mixins.size.h(h)}
  ${({ minW }) => minW && mixins.size.minW(minW)}
  ${({ maxW }) => maxW && mixins.size.maxW(maxW)}
  ${({ minH }) => minH && mixins.size.minH(minH)}
  ${({ maxH }) => maxH && mixins.size.maxH(maxH)}

  ${({ backgroundCover }) => backgroundCover && mixins.background.cover}
  ${({ backgroundContain }) => backgroundContain && mixins.background.contain}
  ${({ backgroundGradient }) =>
    backgroundGradient &&
    mixins.background.gradient(
      backgroundGradient.direction,
      ...backgroundGradient.colors
    )}
`;

const styledComponentsCache: Record<string, any> = {};

const getStyledComponent = (tag: keyof React.JSX.IntrinsicElements) => {
  if (!styledComponentsCache[tag]) {
    styledComponentsCache[tag] = styled(tag)<ExtendedTypographyProps>`
      ${baseStyles}
    `;
  }
  return styledComponentsCache[tag];
};

export const Typography = React.memo(({
  variant = 'p',
  tag,
  children,
  ...props
}: ExtendedTypographyProps) => {
  // Determine the HTML tag to use
  const elementTag = tag || variantMapping[variant] || 'p';
  
  // Get the styled component from cache
  const Component = getStyledComponent(elementTag as keyof React.JSX.IntrinsicElements);

  return (
    <Component variant={variant} {...props}>
      {children}
    </Component>
  );
});

// Display name for debugging
Typography.displayName = 'Typography';

export * from './types';