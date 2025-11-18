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

interface ColorBoxProps {
  solidClass: string;
  outlineClass: string;
  children: React.ReactNode;
}

const ColorBox = ({ solidClass, outlineClass, children }: ColorBoxProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex h-16 w-32 flex-col items-center justify-center rounded p-4 ${solidClass}`}
      >
        <div>{children}</div>
      </div>
      <div
        className={`flex h-16 w-32 flex-col items-center justify-center rounded border p-2 ${outlineClass}`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

const Colors = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-wrap gap-2">
        <ColorBox
          solidClass="bg-primary text-on-primary"
          outlineClass="border-border-primary text-primary"
        >
          Primary
        </ColorBox>
        <ColorBox
          solidClass="bg-primary text-on-primary shadow-full-small shadow-shadow-primary"
          outlineClass="border-border-primary text-primary shadow-full-small shadow-shadow-primary"
        >
          Small
        </ColorBox>
        <ColorBox
          solidClass="bg-primary text-on-primary shadow-full-large shadow-shadow-primary"
          outlineClass="border-border-primary text-primary shadow-full-large shadow-shadow-primary"
        >
          Large
        </ColorBox>
        <ColorBox
          solidClass="bg-surface text-on-surface"
          outlineClass="border-border-surface bg-surface text-on-surface"
        >
          Surface
        </ColorBox>
        <ColorBox
          solidClass="bg-surface text-on-surface shadow shadow-shadow-surface"
          outlineClass="border-border-surface bg-surface text-on-surface shadow shadow-shadow-surface"
        >
          Shadow
        </ColorBox>
        <ColorBox
          solidClass="bg-disabled text-on-disabled"
          outlineClass="border-border-disabled  text-disabled"
        >
          Disabled
        </ColorBox>
        <div className="flex flex-col gap-2">
          <div className="text-label text-sm">Control</div>
          <div className="bg-control border-border-control w-32 rounded border px-2 py-1">
            Control
          </div>
        </div>
      </div>
    </div>
  );
};
