import { useEffect, useState } from 'react';
import { ColorSwatch } from './components/ui/display/ColorSwatch';
import { PaletteBaseColors } from './features/palette-initialization';
import { usePalette } from './providers/palette';
import type { PaletteColor, PaletteVariant } from './types/palette-types';

export const PaletteDisplay = () => {
  const { palette } = usePalette();

  if (palette.variants.length === 0) {
    return <PaletteBaseColors />;
  }

  return <Palette palette={palette.variants[0]} />;
};

interface PaletteProps {
  palette: PaletteVariant;
}

const Palette = ({ palette }: PaletteProps) => {
  const { updateLuminance, updateChroma } = usePalette();
  const [luminance, setLuminance] = useState(palette.luminance);
  const [chroma, setChroma] = useState(palette.chroma);

  useEffect(() => {
    updateLuminance(luminance);
  }, [luminance, updateLuminance]);

  useEffect(() => {
    updateChroma(chroma);
  }, [chroma, updateChroma]);

  return (
    <div className="bg-background-surface text-on-background-surface flex h-screen w-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        <Colors colors={palette.primary} />
        <Colors colors={palette.secondary} />
        <Colors colors={palette.accent} />
      </div>
      <div className="mt-4 flex gap-4">
        <div className="flex flex-col items-center">
          <label className="mb-2">Luminance: {luminance.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={luminance}
            onChange={(e) => setLuminance(parseFloat(e.target.value))}
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="mb-2">Chroma: {chroma.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={chroma}
            onChange={(e) => setChroma(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

interface ColorsProps {
  colors: PaletteColor;
}

const Colors = ({ colors }: ColorsProps) => {
  return (
    <div className="flex items-center gap-2">
      <ColorSwatch className="h-16 w-16" color={colors.base} />
      <ColorSwatch className="h-16 w-16" color={colors.light} />
      <ColorSwatch className="h-16 w-16" color={colors.dark} />
      <ColorSwatch className="h-16 w-16" color={colors.surface} />
      <ColorSwatch className="h-16 w-16" color={colors.on} />
    </div>
  );
};
