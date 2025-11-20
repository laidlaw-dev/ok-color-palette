import { useState } from 'react';
import { ColorSwatch } from './components/ui/display/ColorSwatch';
import { OkColor } from './lib/color';
import { generateComplementaryColors } from './lib/color/complementary-colors';
import { HexColorPicker } from './components/ui/colors/HexColorPicker';

export const PaletteDisplay = () => {
  const [color, setColor] = useState(OkColor.fromHex('#3498db'));
  const complementaries = generateComplementaryColors(color);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col gap-4">
        <div>
          <HexColorPicker colorValue={color} onColorChange={setColor} />
        </div>
      </div>
      <div className="bg-surface flex gap-4 p-4">
        <div className="flex flex-col items-center gap-2">
          <ColorSwatch color={color} className="h-16 w-16" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <ColorSwatch
            color={complementaries.complementary[0]}
            className="h-16 w-16"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          {complementaries.splitComplements.map((c, i) => (
            <ColorSwatch key={i} color={c} className="h-16 w-16" />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {complementaries.triadic.map((c, i) => (
            <ColorSwatch key={i} color={c} className="h-16 w-16" />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          {complementaries.analogous.map((c, i) => (
            <ColorSwatch key={i} color={c} className="h-16 w-16" />
          ))}
        </div>
      </div>
    </div>
  );
};
