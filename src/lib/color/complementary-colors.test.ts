import { generateComplementaryColors } from './complementary-colors';
import { OkColor } from './ok-color';

describe('generateComplementaryColors', () => {
  const mock_baseColor = new OkColor(0.5, 0.2, 120, 1);

  it('should return an object with all complementary color types', () => {
    const result = generateComplementaryColors(mock_baseColor);

    expect(result).toHaveProperty('complementary');
    expect(result).toHaveProperty('splitComplements');
    expect(result).toHaveProperty('triadic');
    expect(result).toHaveProperty('analogous');
  });

  it('should generate complementary color rotated by 180 degrees', () => {
    const result = generateComplementaryColors(mock_baseColor);

    expect(result.complementary).toHaveLength(1);
    expect(result.complementary[0].h).toBe((mock_baseColor.h + 180) % 360);
    expect(result.complementary[0].l).toBe(mock_baseColor.l);
    expect(result.complementary[0].c).toBe(mock_baseColor.c);
  });

  it('should generate split complementary colors rotated by 150 and 210 degrees', () => {
    const result = generateComplementaryColors(mock_baseColor);

    expect(result.splitComplements).toHaveLength(2);
    expect(result.splitComplements[0].h).toBe((mock_baseColor.h + 150) % 360);
    expect(result.splitComplements[1].h).toBe((mock_baseColor.h + 210) % 360);
  });

  it('should generate triadic colors rotated by 120 and 240 degrees', () => {
    const result = generateComplementaryColors(mock_baseColor);

    expect(result.triadic).toHaveLength(2);
    expect(result.triadic[0].h).toBe((mock_baseColor.h + 120) % 360);
    expect(result.triadic[1].h).toBe((mock_baseColor.h + 240) % 360);
  });

  it('should generate analogous colors rotated by -60, -30, 30, and 60 degrees', () => {
    const result = generateComplementaryColors(mock_baseColor);

    expect(result.analogous).toHaveLength(4);
    expect(result.analogous[0].h).toBe((mock_baseColor.h - 60 + 360) % 360);
    expect(result.analogous[1].h).toBe((mock_baseColor.h - 30 + 360) % 360);
    expect(result.analogous[2].h).toBe((mock_baseColor.h + 30) % 360);
    expect(result.analogous[3].h).toBe((mock_baseColor.h + 60) % 360);
  });

  it('should preserve lightness and chroma in all generated colors', () => {
    const result = generateComplementaryColors(mock_baseColor);

    const allColors = [
      ...result.complementary,
      ...result.splitComplements,
      ...result.triadic,
      ...result.analogous,
    ];

    allColors.forEach((color) => {
      expect(color.l).toBe(mock_baseColor.l);
      expect(color.c).toBe(mock_baseColor.c);
      expect(color.alpha).toBe(mock_baseColor.alpha);
    });
  });

  it('should handle colors with zero hue', () => {
    const mock_zeroHue = new OkColor(0.5, 0.2, 0, 1);
    const result = generateComplementaryColors(mock_zeroHue);

    expect(result.complementary[0].h).toBe(180);
    expect(result.triadic[0].h).toBe(120);
    expect(result.triadic[1].h).toBe(240);
  });

  it('should handle colors near 360 degrees hue', () => {
    const mock_highHue = new OkColor(0.5, 0.2, 350, 1);
    const result = generateComplementaryColors(mock_highHue);

    expect(result.complementary[0].h).toBe((350 + 180) % 360);
    expect(result.analogous[0].h).toBe((350 - 60 + 360) % 360);
  });

  it('should handle achromatic colors', () => {
    const mock_gray = new OkColor(0.5, 0, 0, 1);
    const result = generateComplementaryColors(mock_gray);

    expect(result.complementary).toHaveLength(1);
    expect(result.splitComplements).toHaveLength(2);
    expect(result.triadic).toHaveLength(2);
    expect(result.analogous).toHaveLength(4);
  });

  it('should handle colors with different lightness values', () => {
    const mock_dark = new OkColor(0.2, 0.15, 180, 1);
    const mock_light = new OkColor(0.8, 0.15, 180, 1);

    const darkResult = generateComplementaryColors(mock_dark);
    const lightResult = generateComplementaryColors(mock_light);

    expect(darkResult.complementary[0].l).toBe(0.2);
    expect(lightResult.complementary[0].l).toBe(0.8);
  });

  it('should handle colors with different chroma values', () => {
    const mock_lowChroma = new OkColor(0.5, 0.05, 120, 1);
    const mock_highChroma = new OkColor(0.5, 0.3, 120, 1);

    const lowResult = generateComplementaryColors(mock_lowChroma);
    const highResult = generateComplementaryColors(mock_highChroma);

    expect(lowResult.complementary[0].c).toBe(0.05);
    expect(highResult.complementary[0].c).toBe(0.3);
  });

  it('should handle colors with transparency', () => {
    const mock_transparent = new OkColor(0.5, 0.2, 120, 0.5);
    const result = generateComplementaryColors(mock_transparent);

    const allColors = [
      ...result.complementary,
      ...result.splitComplements,
      ...result.triadic,
      ...result.analogous,
    ];

    allColors.forEach((color) => {
      expect(color.alpha).toBe(0.5);
    });
  });

  it('should generate all colors as OkColor instances', () => {
    const result = generateComplementaryColors(mock_baseColor);

    const allColors = [
      ...result.complementary,
      ...result.splitComplements,
      ...result.triadic,
      ...result.analogous,
    ];

    allColors.forEach((color) => {
      expect(color).toBeInstanceOf(OkColor);
    });
  });
});
