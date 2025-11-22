import { OkColor } from '@/lib/color';

export interface BaseColors {
  basePrimary: OkColor;
  baseSecondary?: OkColor;
  baseAccent?: OkColor;
}

export interface Palette {
  base: BaseColors;
}
