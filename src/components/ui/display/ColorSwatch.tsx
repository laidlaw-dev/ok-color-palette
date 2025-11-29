import type { OkColor } from '@/lib/color';
import { clsx } from 'clsx';

interface ColorSwatchProps {
  color?: OkColor | null;
  className?: string;
}

/**
 * A visual component that displays a color as a square swatch.
 *
 * @param props - The component props
 * @param props.color - The color object to display (must have a `toHex()` method). Maybe null or undefined.
 * @param props.className - Optional additional CSS classes to apply. Defaults to empty string.
 *                          If height (h-*) or width (w-*) classes are provided, they override
 *                          the default 8-unit size (h-8/w-8)
 *
 * @returns A div element styled with the provided color as background
 *
 * @example
 * ```tsx
 * <ColorSwatch color={myColor} />
 * <ColorSwatch color={myColor} className="h-12 w-12" />
 * ```
 */
export const ColorSwatch = ({ color, className = '' }: ColorSwatchProps) => {
  const colorStyle =
    color != null
      ? { backgroundColor: color.toHex() }
      : {
          background:
            'radial-gradient(circle at 50%, #000000 0%, #FFFFFF 100%)',
          opacity: 0.5,
        };

  const heightClass = /\bh-/.test(className) ? '' : 'h-8';
  const widthClass = /\bw-/.test(className) ? '' : 'w-8';

  return (
    <div
      className={clsx(
        'border-border-surface transition-background rounded border duration-250 ease-in-out',
        { [heightClass]: Boolean(heightClass) },
        { [widthClass]: Boolean(widthClass) },
        { [className]: Boolean(className) }
      )}
      style={colorStyle}
    />
  );
};
