import React from 'react';

import { MixinProps } from '../../../styles/mixins';

export const variantMapping = {
  'h-1': 'h1',
  'h-2': 'h2',
  'h-3': 'h3',
  p: 'body1',
  span: 'body2',
  small: 'body2',
};

export type TypographyVariant = keyof typeof variantMapping;

export type TypographyColors =
  // Beige
  | 'B500'
  | 'B100'
  //slate
  | 'S600'
  //grey
  | 'G900'
  | 'G500'
  | 'G300'
  | 'G100'
  //secondary
  | 'SGreen'
  | 'SYellow'
  | 'SCyan'
  | 'SNavy'
  | 'SPurple'
  | 'SRed'
  // other
  | 'OPurple'
  | 'OTurquoise'
  | 'OBrown'
  | 'OMagenta'
  | 'OBlue'
  | 'ONavyGrey'
  | 'OArmyGreen'
  | 'OGold'
  | 'OOrange'
  | 'BG'
  // white
  | 'white';

export type TypographyAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify';

export type TypographyFontWeight = 'regular' | 'medium' | 'bold' | 'black';

export type TypographyFont = 'publicSans';

export interface TypographyProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {
  tag?: keyof React.JSX.IntrinsicElements;
  variant?: TypographyVariant;
  color?: TypographyColors;
  backgroundColor?: TypographyColors;
  fontWeight?: TypographyFontWeight;
  gutterBottom?: boolean;
  align?: TypographyAlign;
  noWrap?: boolean;
  underline?: 'none' | 'always' | 'hover';
  customClassName?: string;
  children?: React.ReactNode;
  font?: TypographyFont;
}

export interface ExtendedTypographyProps extends TypographyProps, MixinProps {}
