export interface OklchColor {
  l: number; // Lightness
  c: number; // Chroma
  h: number; // Hue
  alpha?: number; // Optional alpha channel
}

export interface RgbColor {
  r: number; // Red channel (0-255)
  g: number; // Green channel (0-255)
  b: number; // Blue channel (0-255)
}

export type HexColor = string; // e.g., '#RRGGBB' or '#RRGGBBAA'
