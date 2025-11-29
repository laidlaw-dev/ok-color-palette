import { OkColorButton } from '@/components/ui';
import { HexColorPicker } from '@/components/ui/colors/HexColorPicker';
import { ColorSwatch } from '@/components/ui/display/ColorSwatch';
import type { ComplementaryColors, OkColor } from '@/lib/color';
import { useTranslation } from 'react-i18next';

interface BaseColorsProps {
  label: string;
  color: OkColor;
  onChange: (color: OkColor) => void;
  complementaryColors?: ComplementaryColors;
}

/**
 * A component that displays a base color picker with complementary color suggestions.
 *
 * @param props - The component props
 * @param props.label - The label text to display above the color picker
 * @param props.color - The current color value in hex format
 * @param props.onChange - Callback function triggered when the color changes
 * @param props.complementaryColors - Optional array of complementary colors to suggest to the user
 *
 * @returns A styled color picker card with a swatch, hex picker, and optional complementary color suggestions
 *
 * @example
 * ```tsx
 * <BaseColor
 *   label="Primary Color"
 *   color="#FF5733"
 *   onChange={(newColor) => setPrimaryColor(newColor)}
 *   complementaryColors={['#33FF57', '#5733FF']}
 * />
 * ```
 */
export const BaseColor = ({
  label,
  color,
  onChange,
  complementaryColors,
}: BaseColorsProps) => {
  return (
    <div className="bg-surface border-border-surface flex w-64 flex-col gap-2 rounded border p-2 shadow">
      <div className="text-sm font-medium">{label}</div>
      <ColorSwatch className="h-16 w-full" color={color} />
      <HexColorPicker colorValue={color} onColorChange={onChange} />
      {complementaryColors && (
        <SuggestedColors
          complementaryColors={complementaryColors}
          onSelect={onChange}
        />
      )}
    </div>
  );
};

interface SuggestedColorsProps {
  complementaryColors: ComplementaryColors;
  onSelect: (color: OkColor) => void;
}

/**
 * Displays a collection of suggested color harmonies based on a base color.
 *
 * Presents complementary, split-complementary, triadic, and analogous color schemes
 * in a responsive grid layout. Each color is rendered as a clickable button that
 * triggers the onSelect callback when clicked.
 *
 * @component
 * @param {SuggestedColorsProps} props - The component props
 * @param {ComplementaryColors} props.complementaryColors - Object containing various color harmony schemes
 * @param {OkColor[]} props.complementaryColors.complementary - Array containing the complementary color
 * @param {OkColor[]} props.complementaryColors.splitComplements - Array of split-complementary colors
 * @param {OkColor[]} props.complementaryColors.triadic - Array of triadic color scheme colors
 * @param {OkColor[]} props.complementaryColors.analogous - Array of analogous colors
 * @param {(color: OkColor) => void} props.onSelect - Callback function invoked when a color is selected
 *
 * @returns {JSX.Element} A section displaying suggested color harmonies grouped by scheme type
 *
 * @example
 * ```tsx
 * <SuggestedColors
 *   complementaryColors={colorHarmonies}
 *   onSelect={(color) => console.log('Selected:', color)}
 * />
 * ```
 */
const SuggestedColors = ({
  complementaryColors,
  onSelect,
}: SuggestedColorsProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium">{t('common.suggested')}</div>
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <OkColorButton
            okColor={complementaryColors.complementary[0]}
            onClick={() => onSelect(complementaryColors.complementary[0])}
          />
        </div>
        <div className="flex gap-2">
          {complementaryColors.splitComplements.map((color, index) => (
            <OkColorButton
              key={index}
              okColor={color}
              onClick={() => onSelect(color)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {complementaryColors.triadic.map((color, index) => (
            <OkColorButton
              key={index}
              okColor={color}
              onClick={() => onSelect(color)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {complementaryColors.analogous.map((color, index) => (
            <OkColorButton
              key={index}
              okColor={color}
              onClick={() => onSelect(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
