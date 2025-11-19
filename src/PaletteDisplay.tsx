import { OkButton } from './components/ui';

export const PaletteDisplay = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 p-4">
      <div className="flex gap-4">
        <OkButton>Filled</OkButton>
        <OkButton variant="outlined">Outlined</OkButton>
        <OkButton variant="text">Text</OkButton>
      </div>
      <div className="flex gap-4">
        <OkButton disabled>Disabled</OkButton>
        <OkButton variant="outlined" disabled>
          Outlined
        </OkButton>
        <OkButton variant="text" disabled>
          Text
        </OkButton>
      </div>
      <div className="flex items-center gap-4">
        <OkButton size="small">Small</OkButton>
        <OkButton size="medium">Medium</OkButton>
        <OkButton size="large">Large</OkButton>
      </div>
    </div>
  );
};
