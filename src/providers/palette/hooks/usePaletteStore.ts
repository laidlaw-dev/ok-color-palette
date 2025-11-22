import { OkColor } from '@/lib/color';
import type { BaseColors, Palette } from '@/types/palette-types';
import { useCallback, useState } from 'react';

const defaultPalette = {
  base: {
    basePrimary: OkColor.fromHex('#a077FF'),
    baseSecondary: undefined,
    baseAccent: undefined,
  },
};

export interface UsePalette {
  palette: Palette;
  init: (base: BaseColors) => void;
}

export const usePaletteStore = (): UsePalette => {
  const [palette, setPalette] = useState<Palette>({ ...defaultPalette });

  const init = useCallback((base: BaseColors) => {
    setPalette((prev) => ({ ...prev, base: { ...base } }));
  }, []);

  return {
    palette,
    init,
  };
};
