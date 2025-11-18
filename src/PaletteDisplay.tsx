import { OkColor } from './lib/color';
import { ColorSwatch } from './ui/display/ColorSwatch';

export const PaletteDisplay = () => {
  return (
    <div className="width-screen flex h-screen items-stretch">
      <div className="bg-background text-foreground flex-1">{<Colors />}</div>
      <div className="bg-background dark text-foreground flex-1">
        {<Colors />}
      </div>
    </div>
  );
};

const Colors = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-wrap gap-2">
        <ColorSwatch color={new OkColor(0.7, 0.1, 240)} className="h-12 w-12" />
        <ColorSwatch color={new OkColor(0.5, 0.3, 120)} />
        <ColorSwatch color={new OkColor(0.3, 0.5, 0)} className="h-12 w-12" />
      </div>
    </div>
  );
};
