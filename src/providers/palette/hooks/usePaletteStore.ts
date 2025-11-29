import { generateComplementaryColors, OkColor } from '@/lib/color';
import type { BaseColors, Palette } from '@/types/palette-types';
import { useCallback, useState } from 'react';
import {
  generatePaletteVariant,
  updatePaletteVariant,
} from '../lib/generate-palette-variant';

const defaultColours = generateComplementaryColors(OkColor.fromHex('#a077FF'));

const defaultPalette = {
  base: {
    basePrimary: OkColor.fromHex('#a077FF'),
    baseSecondary: defaultColours.analogous[0],
    baseAccent: defaultColours.complementary[0],
  },
  variants: [],
};

export interface UsePalette {
  palette: Palette;
  generate: (base: BaseColors) => void;
  updateLuminance: (luminance: number) => void;
  updateChroma: (chroma: number) => void;
}

export const usePaletteStore = (): UsePalette => {
  const [palette, setPalette] = useState<Palette>({ ...defaultPalette });

  const generate = useCallback((base: BaseColors) => {
    const newVariant = generatePaletteVariant(base);
    setPalette((prev) => ({
      base: { ...base },
      variants: [...prev.variants, newVariant],
    }));
  }, []);

  const updateLuminance = useCallback((luminance: number) => {
    setPalette((prev) => {
      if (prev.variants.length === 0) {
        return prev;
      }
      const updatedVariant = updatePaletteVariant(
        prev.base,
        luminance,
        prev.variants[0].chroma
      );
      return {
        base: prev.base,
        variants: [updatedVariant, ...prev.variants.slice(1)],
      };
    });
  }, []);

  const updateChroma = useCallback((chroma: number) => {
    setPalette((prev) => {
      if (prev.variants.length === 0) {
        return prev;
      }
      const updatedVariant = updatePaletteVariant(
        prev.base,
        prev.variants[0].luminance,
        chroma
      );
      return {
        base: prev.base,
        variants: [updatedVariant, ...prev.variants.slice(1)],
      };
    });
  }, []);

  return {
    palette,
    generate,
    updateLuminance,
    updateChroma,
  };
};
