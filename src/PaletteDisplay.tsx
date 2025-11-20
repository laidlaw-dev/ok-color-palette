import { ColorSwatch } from './components/ui/display/ColorSwatch';
import { OkColor } from './lib/color';

export const PaletteDisplay = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 p-4">
      <div className="bg-surface flex gap-4">
        <ColorSwatch color={null} />
        <ColorSwatch color={null} className="h-12 w-12" />
        <ColorSwatch color={OkColor.fromHex('#FF5733')} />
        <ColorSwatch color={OkColor.fromHex('#FF5733')} className="h-12 w-12" />
      </div>
    </div>
  );
};
