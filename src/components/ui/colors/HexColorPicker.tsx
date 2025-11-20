import { OkColor } from '@/lib/color';
import { OkInput } from '../../ui';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface HexColorPickerProps {
  colorValue?: OkColor;
  onColorChange: (color: OkColor) => void;
}

export const HexColorPicker = ({
  colorValue,
  onColorChange,
}: HexColorPickerProps) => {
  const { t } = useTranslation();
  const [hexInput, setHexInput] = useState<string>(colorValue?.toHex() || '');

  useEffect(() => {
    if (OkColor.validateHex(hexInput)) {
      const newColor = OkColor.fromHex(hexInput);
      onColorChange(newColor);
    }
  }, [hexInput, onColorChange]);

  return (
    <OkInput
      label={t('color_picker.hex')}
      value={hexInput}
      onChange={(e) => setHexInput(e.target.value)}
    />
  );
};
