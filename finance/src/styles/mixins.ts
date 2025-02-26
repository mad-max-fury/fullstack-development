import { css } from 'styled-components';

import { breakpoints as screens } from './breakpoints';

type SpacingValue = string | number;
type ResponsiveValue<T> = T | T[];
type CSSValue = string | number | (string | number)[];

interface SpacingProps {
  p?: ResponsiveValue<SpacingValue>;
  px?: ResponsiveValue<SpacingValue>;
  py?: ResponsiveValue<SpacingValue>;
  pt?: ResponsiveValue<SpacingValue>;
  pr?: ResponsiveValue<SpacingValue>;
  pb?: ResponsiveValue<SpacingValue>;
  pl?: ResponsiveValue<SpacingValue>;
  m?: ResponsiveValue<SpacingValue>;
  mx?: ResponsiveValue<SpacingValue>;
  my?: ResponsiveValue<SpacingValue>;
  mt?: ResponsiveValue<SpacingValue>;
  mr?: ResponsiveValue<SpacingValue>;
  mb?: ResponsiveValue<SpacingValue>;
  ml?: ResponsiveValue<SpacingValue>;
}

interface SizeProps {
  w?: ResponsiveValue<CSSValue>;
  h?: ResponsiveValue<CSSValue>;
  minW?: ResponsiveValue<CSSValue>;
  maxW?: ResponsiveValue<CSSValue>;
  minH?: ResponsiveValue<CSSValue>;
  maxH?: ResponsiveValue<CSSValue>;
}

interface LayoutProps {
  position?: 'relative' | 'absolute' | 'fixed';
  positionValues?: string;
  gridColumn?: ResponsiveValue<number>;
  gridRow?: ResponsiveValue<number>;
}

interface BackgroundProps {
  backgroundCover?: boolean;
  backgroundContain?: boolean;
  backgroundGradient?: {
    direction: string;
    colors: string[];
  };
}

interface TypographyProps {
  lineClamp?: number;
  responsiveFontSize?: {
    min: string;
    max: string;
  };
}

interface FlexProps {
  flexCenter?: boolean;
  flexBetween?: boolean;
  flexAround?: boolean;
  flexColumn?: boolean;
  flexColumnCenter?: boolean;
}

export interface MixinProps
  extends SpacingProps,
    SizeProps,
    LayoutProps,
    BackgroundProps,
    TypographyProps,
    FlexProps {
  textTruncateLines?: number;
  resetList?: boolean;
  absoluteFill?: boolean;
  fixedFill?: boolean;
  responsiveGrid?: {
    minWidth: string;
    gap: string;
  };
  transition?: {
    properties: string;
    duration?: string;
    timing?: string;
  };
  boxShadow?: string;
  border?: {
    width: string;
    style: string;
    color: string;
  };
  borderRadius?: string;
  visuallyHidden?: boolean;
}

const handleResponsive = (
  property: string,
  value: ResponsiveValue<CSSValue>,
  breakpoints: string[] = Object.values(screens),
) => {
  if (!Array.isArray(value)) {
    const val = `${property}: ${value};`;
    return css`
      ${val}
    `;
  }

  return value.reduce(
    (acc, val, idx) => css`
      ${acc}
      ${idx === 0
        ? `${property}: ${val};`
        : `@media screen and (min-width: ${breakpoints[idx - 1]}) { ${property}: ${val}; }`}
    `,
    css``,
  );
};

export const mixins = {
  flex: {
    center: css`
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    between: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    around: css`
      display: flex;
      justify-content: space-around;
      align-items: center;
    `,
    column: css`
      display: flex;
      flex-direction: column;
    `,
    columnCenter: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
  },

  spacing: {
    p: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('padding', value),
    px: (value: ResponsiveValue<SpacingValue>) => css`
      ${handleResponsive('padding-left', value)}
      ${handleResponsive('padding-right', value)}
    `,
    py: (value: ResponsiveValue<SpacingValue>) => css`
      ${handleResponsive('padding-top', value)}
      ${handleResponsive('padding-bottom', value)}
    `,
    pt: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('padding-top', value),
    pr: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('padding-right', value),
    pb: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('padding-bottom', value),
    pl: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('padding-left', value),
    m: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('margin', value),
    mx: (value: ResponsiveValue<SpacingValue>) => css`
      ${handleResponsive('margin-left', value)}
      ${handleResponsive('margin-right', value)}
    `,
    my: (value: ResponsiveValue<SpacingValue>) => css`
      ${handleResponsive('margin-top', value)}
      ${handleResponsive('margin-bottom', value)}
    `,
    mt: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('margin-top', value),
    mr: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('margin-right', value),
    mb: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('margin-bottom', value),
    ml: (value: ResponsiveValue<SpacingValue>) =>
      handleResponsive('margin-left', value),
  },

  size: {
    w: (value: ResponsiveValue<CSSValue>) => handleResponsive('width', value),
    h: (value: ResponsiveValue<CSSValue>) => handleResponsive('height', value),
    minW: (value: ResponsiveValue<CSSValue>) =>
      handleResponsive('min-width', value),
    maxW: (value: ResponsiveValue<CSSValue>) =>
      handleResponsive('max-width', value),
    minH: (value: ResponsiveValue<CSSValue>) =>
      handleResponsive('min-height', value),
    maxH: (value: ResponsiveValue<CSSValue>) =>
      handleResponsive('max-height', value),
  },

  position: {
    relative: css`
      position: relative;
    `,
    absolute: (value?: string) => css`
      position: absolute;
      ${value &&
      value.split(' ').map((v, i) => {
        const props = ['top', 'right', 'bottom', 'left'];
        return `${props[i]}: ${v};`;
      })}
    `,
    fixed: (value?: string) => css`
      position: fixed;
      ${value &&
      value.split(' ').map((v, i) => {
        const props = ['top', 'right', 'bottom', 'left'];
        return `${props[i]}: ${v};`;
      })}
    `,
    fill: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `,
  },

  grid: {
    container: (columns: number = 12, gap: string = '1rem') => css`
      display: grid;
      grid-template-columns: repeat(${columns}, 1fr);
      gap: ${gap};
    `,
    column: (span: ResponsiveValue<number>) =>
      handleResponsive('grid-column', `span ${span}`),
    row: (span: ResponsiveValue<number>) =>
      handleResponsive('grid-row', `span ${span}`),
    responsive: (minWidth: string, gap: string) => css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr));
      gap: ${gap};
    `,
  },
 
  typography: {
    truncate: css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
    lineClamp: (lines: number) => css`
      display: -webkit-box;
      -webkit-line-clamp: ${lines};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `,
    responsive: (minSize: string, maxSize: string) => css`
      font-size: clamp(${minSize}, 5vw, ${maxSize});
    `,
  },

  background: {
    cover: css`
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    `,
    contain: css`
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    `,
    gradient: (direction: string, ...colors: string[]) => css`
      background: linear-gradient(${direction}, ${colors.join(', ')});
    `,
  },

  utils: {
    transition: (
      properties: string,
      duration: string = '0.3s',
      timing: string = 'ease',
    ) => css`
      transition: ${properties} ${duration} ${timing};
    `,
    boxShadow: (shadow: string) => css`
      box-shadow: ${shadow};
    `,
    border: (width: string, style: string, color: string) => css`
      border: ${width} ${style} ${color};
    `,
    borderRadius: (radius: string) => css`
      border-radius: ${radius};
    `,
    resetList: css`
      list-style: none;
      margin: 0;
      padding: 0;
    `,
    visuallyHidden: css`
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    `,
  },
};
