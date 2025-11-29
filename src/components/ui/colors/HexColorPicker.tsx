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

  const colorHexValue = colorValue ? colorValue.toHex() : '';

  const [isEditing, setIsEditing] = useState(false);

  const handleColorHexChange = (newHex: string) => {
    if (!isEditing) {
      return;
    }
    if (!OkColor.validateHex(newHex)) {
      return;
    }
    const newColor = OkColor.fromHex(newHex);
    if (newColor.toHex() !== colorHexValue) {
      onColorChange(newColor);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <HexColorPickerInput
          colorHexValue={colorHexValue}
          onColorHexChange={handleColorHexChange}
          onBlur={handleBlur}
        />
      ) : (
        <OkInput
          label={t('color_picker.hex')}
          value={colorHexValue}
          onChange={() => {}}
          inert
        />
      )}
    </div>
  );
};

interface HexColorPickerInputProps {
  colorHexValue: string;
  onColorHexChange: (color: string) => void;
  onBlur: () => void;
}

const HexColorPickerInput = ({
  colorHexValue,
  onColorHexChange,
  onBlur,
}: HexColorPickerInputProps) => {
  const { t } = useTranslation();

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [hexInput, setHexInput] = useState<string>(colorHexValue);

  useEffect(() => {
    onColorHexChange(hexInput);
  }, [hexInput, onColorHexChange]);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
    }
  }, [inputRef]);

  return (
    <OkInput
      ref={setInputRef}
      label={t('color_picker.hex')}
      value={hexInput}
      onChange={(e) => setHexInput(e.target.value)}
      onBlur={onBlur}
      placeholder="#RRGGBB"
    />
  );
};
