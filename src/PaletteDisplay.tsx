import { useState } from 'react';
import { ColorSwatch } from './components/ui/display/ColorSwatch';
import { OkColor } from './lib/color';
import { generateComplementaryColors } from './lib/color/complementary-colors';
import { HexColorPicker } from './components/ui/colors/HexColorPicker';
import { OkColorButton } from './components/ui/buttons/OkColorButton';

export const PaletteDisplay = () => {
  const [color, setColor] = useState(OkColor.fromHex('#3498db'));
  const complementaries = generateComplementaryColors(color);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col gap-4">
        <OkColorButton okColor={color} />
        <OkColorButton
          okColor={complementaries.complementary[0]}
          size="small"
        />
        <OkColorButton okColor={complementaries.triadic[0]} size="large" />
        <OkColorButton okColor={color} disabled />
        <OkColorButton okColor={null} />
      </div>
    </div>
  );
};
