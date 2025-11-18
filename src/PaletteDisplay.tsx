export const PaletteDisplay = () => {
  return (
    <div className="width-screen h-screen flex items-stretch">
      <div className="flex-1 bg-background">{<Colors />}</div>
      <div className="flex-1 bg-background dark">{<Colors />}</div>
    </div>
  );
};

interface ColorBoxProps {
  className?: string;
  classLight?: string;
  classDark?: string;
  children: React.ReactNode;
}

const ColorBox = ({
  className,
  classLight,
  classDark,
  children,
}: ColorBoxProps) => {
  return (
    <div
      className={`w-32 h-16 p-4 rounded flex flex-col items-center justify-center ${className ? className : ''}`}
    >
      <div>{children}</div>
      <div className="flex items-center justify-center gap-2">
        {classLight && (
          <div className={`h-4 w-4 rounded-full ${classLight}`}></div>
        )}
        {classDark && (
          <div className={`h-4 w-4 rounded-full ${classDark}`}></div>
        )}
      </div>
    </div>
  );
};

const Colors = () => {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap">
        <ColorBox
          className="bg-primary text-on-primary"
          classLight="bg-primary-light"
          classDark="bg-primary-dark"
        >
          Primary
        </ColorBox>
        <ColorBox
          className="bg-secondary text-on-secondary"
          classLight="bg-secondary-light"
          classDark="bg-secondary-dark"
        >
          Secondary
        </ColorBox>
        <ColorBox className="bg-background text-on-background">
          Background
        </ColorBox>
        <ColorBox
          className="bg-surface text-on-surface"
          classLight="bg-surface-light"
          classDark="bg-surface-dark"
        >
          Surface
        </ColorBox>
      </div>
      <div className="flex gap-2 flex-wrap">
        <ColorBox
          className="bg-error text-on-error"
          classLight="bg-error-light"
          classDark="bg-error-dark"
        >
          Error
        </ColorBox>
        <ColorBox
          className="bg-warning text-on-warning"
          classLight="bg-warning-light"
          classDark="bg-warning-dark"
        >
          Warning
        </ColorBox>
        <ColorBox
          className="bg-info text-on-info"
          classLight="bg-info-light"
          classDark="bg-info-dark"
        >
          Info
        </ColorBox>
        <ColorBox
          className="bg-success text-on-success"
          classLight="bg-success-light"
          classDark="bg-success-dark"
        >
          Success
        </ColorBox>
      </div>
      <div className="flex gap-2 flex-wrap">
        <ColorBox className="bg-error-surface text-error">Error</ColorBox>
        <ColorBox className="bg-warning-surface text-warning">Warning</ColorBox>
        <ColorBox className="bg-info-surface text-info">Info</ColorBox>
        <ColorBox className="bg-success-surface text-success">Success</ColorBox>
      </div>
    </div>
  );
};
