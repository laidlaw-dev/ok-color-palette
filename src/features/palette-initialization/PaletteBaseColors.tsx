import { usePalette } from '@/providers/palette';
import { useEffect, useMemo, useState } from 'react';
import { BaseColor } from './components/BaseColor';
import { generateComplementaryColors } from '@/lib/color/complementary-colors';
import { useTranslation } from 'react-i18next';
import { OkButton } from '@/components/ui';
import clsx from 'clsx';

/**
 * A component that allows users to select and configure base colors for palette generation.
 *
 * This component displays three color pickers for primary, secondary, and accent colors.
 * It automatically generates complementary colors based on the primary color selection
 * and updates the secondary and accent colors accordingly.
 *
 * @component
 * @returns {JSX.Element} A full-screen layout with three base color pickers and a generate button
 *
 * @example
 * ```tsx
 * <PaletteBaseColors />
 * ```
 *
 * @remarks
 * - The component syncs its local state with the global palette state
 * - Complementary colors are recalculated whenever the primary color changes
 * - The secondary and accent colors are automatically set to complementary colors of the primary
 * - Users can override the automatic complementary colors by manually selecting different colors
 * - Clicking the generate button creates a new palette based on the selected base colors
 */
export const PaletteBaseColors = () => {
  const { t } = useTranslation();
  const { palette, generate } = usePalette();

  const [primary, setPrimary] = useState(palette.base.basePrimary);
  const [secondary, setSecondary] = useState(palette.base.baseSecondary);
  const [accent, setAccent] = useState(palette.base.baseAccent);

  useEffect(() => {
    setPrimary(palette.base.basePrimary);
    setSecondary(palette.base.baseSecondary);
    setAccent(palette.base.baseAccent);
  }, [palette]);

  const complementaryColors = useMemo(() => {
    return generateComplementaryColors(primary);
  }, [primary]);

  useEffect(() => {
    setSecondary(complementaryColors.analogous[0]);
    setAccent(complementaryColors.complementary[0]);
  }, [primary, complementaryColors]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 p-8">
      <div
        className={clsx('flex flex-wrap gap-8', 'sm:flex-col', 'lg:flex-row')}
      >
        <BaseColor
          label={t('palette.primary')}
          color={primary}
          onChange={setPrimary}
        />
        <BaseColor
          label={t('palette.secondary')}
          color={secondary}
          onChange={setSecondary}
          complementaryColors={complementaryColors}
        />
        <BaseColor
          label={t('palette.accent')}
          color={accent}
          onChange={setAccent}
          complementaryColors={complementaryColors}
        />
      </div>
      <div>
        <OkButton
          onClick={() => {
            generate({
              basePrimary: primary,
              baseSecondary: secondary,
              baseAccent: accent,
            });
          }}
        >
          {t('common.generate_palette')}
        </OkButton>
      </div>
    </div>
  );
};
