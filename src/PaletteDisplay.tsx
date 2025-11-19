import { useState } from 'react';
import { OkButton } from './components/ui';
import { OkInput } from './components/ui/inputs/OkInput';

export const PaletteDisplay = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
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
      <div className="flex items-center gap-4">
        <OkInput
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          label="Input 1"
        />
        <OkInput
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          disabled
          label="Input 2"
        />
        <OkInput
          value={value3}
          onChange={(e) => setValue3(e.target.value)}
          error="Error message"
          isTouched={true}
        />
      </div>
    </div>
  );
};
