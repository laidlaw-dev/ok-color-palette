import type { BaseColors, PaletteVariant } from '@/types/palette-types';

export const generatePaletteVariant = (
  baseColors: BaseColors
): PaletteVariant => {
  const luminace = 0.8;
  const chroma = baseColors.basePrimary.c;
  return updatePaletteVariant(baseColors, luminace, chroma);
};

export const updatePaletteVariant = (
  baseColors: BaseColors,
  luminance: number,
  chroma: number
): PaletteVariant => {
  const primary = baseColors.basePrimary.copyWith({ l: luminance, c: chroma });
  const secondary = baseColors.baseSecondary.copyWith({
    l: luminance,
    c: chroma,
  });
  const accent = baseColors.baseAccent.copyWith({ l: luminance, c: chroma });

  return {
    luminance: luminance,
    chroma: chroma,
    primary: {
      base: primary,
      light: primary.copyWith({ l: Math.min(1, primary.l + 0.2) }),
      dark: primary.copyWith({ l: Math.max(0, primary.l - 0.2) }),
      surface: primary.copyWith({ l: Math.max(0, primary.l - 0.1) }),
      on: primary,
    },
    secondary: {
      base: secondary,
      light: secondary.copyWith({ l: Math.min(1, secondary.l + 0.2) }),
      dark: secondary.copyWith({ l: Math.max(0, secondary.l - 0.2) }),
      surface: secondary.copyWith({ l: Math.max(0, secondary.l - 0.1) }),
      on: secondary,
    },
    accent: {
      base: accent,
      light: accent.copyWith({ l: Math.min(1, accent.l + 0.2) }),
      dark: accent.copyWith({ l: Math.max(0, accent.l - 0.2) }),
      surface: accent.copyWith({ l: Math.max(0, accent.l - 0.1) }),
      on: accent,
    },
  };
};
