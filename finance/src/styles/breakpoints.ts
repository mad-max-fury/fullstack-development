import { css, CSSObject, Interpolation } from 'styled-components';

export const breakpoints = {
  small: '576px',
  medium: '768px',
  large: '992px',
  xlarge: '1200px',
};

type MediaFunction = (
  styles: TemplateStringsArray | CSSObject,
  ...interpolations: Interpolation<{}>[]
) => Interpolation<{}>;

export const media = {
  // min-width breakpoints
  small: ((...args) => css`
    @media (min-width: ${breakpoints.small}) {
      ${css(...args)}
    }
  `) as MediaFunction,
  medium: ((...args) => css`
    @media (min-width: ${breakpoints.medium}) {
      ${css(...args)}
    }
  `) as MediaFunction,
  large: ((...args) => css`
    @media (min-width: ${breakpoints.large}) {
      ${css(...args)}
    }
  `) as MediaFunction,
  xlarge: ((...args) => css`
    @media (min-width: ${breakpoints.xlarge}) {
      ${css(...args)}
    }
  `) as MediaFunction,

  // max-width breakpoints
  smallMax: ((...args) => css`
    @media (max-width: ${breakpoints.small}) {
      ${css(...args)}
    }
  `) as MediaFunction,
  mediumMax: ((...args) => css`
    @media (max-width: ${breakpoints.medium}) {
      ${css(...args)}
    }
  `) as MediaFunction,
  largeMax: ((...args) => css`
    @media (max-width: ${breakpoints.large}) {
      ${css(...args)}
    }
  `) as MediaFunction,
  xlargeMax: ((...args) => css`
    @media (max-width: ${breakpoints.xlarge}) {
      ${css(...args)}
    }
  `) as MediaFunction,
};