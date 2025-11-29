import chroma from 'chroma-js';
import type { RgbColor } from '@/types';

const hexRegEx = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

/**
 * Represents an immutable OKLCH color.
 */
export class OkColor {
  /** Lightness channel */
  readonly l: number;
  /** Chroma channel */
  readonly c: number;
  /** Hue channel */
  readonly h: number;
  /** Alpha channel */
  readonly alpha: number;

  /**
   * Creates an immutable OkColor instance.
   * @param l - Lightness value (0–1)
   * @param c - Chroma value
   * @param h - Hue value (degrees)
   * @param alpha - Alpha channel (0–1, defaults to 1)
   */
  constructor(l: number, c: number, h: number, alpha: number = 1) {
    this.l = l;
    this.c = c;
    this.h = h;
    this.alpha = alpha;
    Object.freeze(this); // Ensure immutability
  }

  /**
   * Converts the OKLCH color to a hex string.
   * @returns Hex color string (e.g. "#RRGGBB")
   */
  toHex(): string {
    return chroma.oklch(this.l, this.c, this.h, this.alpha).hex();
  }

  toRGB(): RgbColor {
    const [r, g, b] = chroma.oklch(this.l, this.c, this.h, this.alpha).rgb();
    return { r, g, b };
  }

  /**
   * Returns a new OkColor instance with updated properties.
   * @param params - Partial properties to override
   * @returns New OkColor instance
   */
  copyWith({
    l,
    c,
    h,
    alpha,
  }: Partial<Pick<OkColor, 'l' | 'c' | 'h' | 'alpha'>>): OkColor {
    return new OkColor(
      l ?? this.l,
      c ?? this.c,
      h ?? this.h,
      alpha ?? this.alpha
    );
  }

  /**
   * Checks if another OkColor is equal to this one.
   * @param other - The other OkColor to compare
   * @returns True if all channels are equal
   */
  equals(other: OkColor): boolean {
    return (
      this.l === other.l &&
      this.c === other.c &&
      this.h === other.h &&
      this.alpha === other.alpha
    );
  }

  /**
   * Rotates the hue by a given angle.
   * @param angle - Angle in degrees to rotate the hue
   * @returns New OkColor instance with rotated hue
   */
  rotateHue(angle: number): OkColor {
    if (angle < -360 || angle > 360) {
      throw new Error('Angle must be between -360 and 360 degrees');
    }
    const newHue = (this.h + angle + 360) % 360;
    return this.copyWith({ h: newHue });
  }

  /**
   * Calculates the warmth or coolness of the color.
   * @returns A number between -1 (coolest) and 1 (warmest)
   */
  getTemperature(): number {
    const distanceTo180 = Math.abs(((this.h - 180 + 540) % 360) - 180);
    return -1 + distanceTo180 / 90;
  }

  /**
   * Calculates the contrast ratio between this color and another OkColor.
   * @param other - The other OkColor to compare
   * @returns Contrast ratio (1 to 21)
   */
  contrastRatio(other: OkColor): number {
    const lum1 = chroma.oklch(this.l, this.c, this.h).luminance();
    const lum2 = chroma.oklch(other.l, other.c, other.h).luminance();
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Creates an OkColor from a hex string.
   * @param hex - Hex color string (e.g. "#RRGGBB" or "RRGGBB")
   * @returns OkColor instance
   * @throws If the hex string is invalid
   */
  static fromHex(hex: string): OkColor {
    const hexWithHash = hex.startsWith('#') ? hex : `#${hex}`;
    if (!chroma.valid(hexWithHash)) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
    const [r, g, b, a] = chroma(hexWithHash).rgba();
    const [l, c, h] = chroma.rgb(r, g, b).oklch();
    return new OkColor(l, c, !h || Number.isNaN(h) ? 0 : h, a);
  }

  static fromRGB({ r, g, b }: RgbColor): OkColor {
    const [l, c, h] = chroma.rgb(r, g, b).oklch();
    return new OkColor(l, c, !h || Number.isNaN(h) ? 0 : h, 1);
  }

  /**
   * Validates a hex color string.
   * @param hex - Hex color string
   * @returns True if valid, false otherwise
   */
  static validateHex(hex: string): boolean {
    // Ensure string is not empty
    if (hex.trim() === '') {
      return false;
    }
    // Ensure the hex string starts with #
    const hexWithHash = hex.startsWith('#') ? hex : `#${hex}`;
    // Validate the hex string
    if (!hexRegEx.test(hexWithHash)) {
      return false;
    }
    return chroma.valid(hexWithHash);
  }
}
