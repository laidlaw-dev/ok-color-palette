import { OkColor } from '@/lib/color';

export interface BaseColors {
  basePrimary: OkColor;
  baseSecondary: OkColor;
  baseAccent: OkColor;
}

export interface PaletteColor {
  base: OkColor;
  light: OkColor;
  dark: OkColor;
  surface: OkColor;
  on: OkColor;
}

export interface Palette {
  base: BaseColors;
  variants: PaletteVariant[];
}

export interface PaletteVariant {
  luminance: number;
  chroma: number;
  primary: PaletteColor;
  secondary: PaletteColor;
  accent: PaletteColor;
}
