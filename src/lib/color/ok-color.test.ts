import { OkColor } from './ok-color';

describe('OkColor', () => {
  const base = new OkColor(0.5, 0.2, 120, 1);

  it('should create an immutable OkColor instance', () => {
    expect(base.l).toBe(0.5);
    expect(base.c).toBe(0.2);
    expect(base.h).toBe(120);
    expect(base.alpha).toBe(1);
    expect(Object.isFrozen(base)).toBe(true);
  });

  it('should convert to hex string', () => {
    const hex = base.toHex();
    expect(typeof hex).toBe('string');
    expect(hex.startsWith('#')).toBe(true);
    expect(hex.length).toBeGreaterThanOrEqual(7);
  });

  it('should convert to RGB object', () => {
    const rgb = base.toRGB();
    expect(rgb).toHaveProperty('r');
    expect(rgb).toHaveProperty('g');
    expect(rgb).toHaveProperty('b');
    expect(typeof rgb.r).toBe('number');
    expect(typeof rgb.g).toBe('number');
    expect(typeof rgb.b).toBe('number');
  });

  it('should copy with new properties', () => {
    const updated = base.copyWith({ l: 0.7, h: 200 });
    expect(updated.l).toBe(0.7);
    expect(updated.c).toBe(base.c);
    expect(updated.h).toBe(200);
    expect(updated.alpha).toBe(base.alpha);
    expect(updated).not.toBe(base);
  });

  it('should check equality', () => {
    const same = new OkColor(0.5, 0.2, 120, 1);
    const diff = new OkColor(0.5, 0.2, 121, 1);
    expect(base.equals(same)).toBe(true);
    expect(base.equals(diff)).toBe(false);
  });

  it('should rotate hue correctly', () => {
    const rotated = base.rotateHue(180);
    expect(rotated.h).toBe(300);
    const wrapped = base.rotateHue(-150);
    expect(wrapped.h).toBe(330);
  });

  it('should throw error for invalid hue rotation', () => {
    expect(() => base.rotateHue(400)).toThrow();
    expect(() => base.rotateHue(-400)).toThrow();
  });

  it('should calculate temperature', () => {
    const warm = new OkColor(0.5, 0.2, 0, 1);
    const cool = new OkColor(0.5, 0.2, 180, 1);
    expect(typeof base.getTemperature()).toBe('number');
    expect(warm.getTemperature()).toBeCloseTo(1);
    expect(cool.getTemperature()).toBeCloseTo(-1);
  });

  it('should calculate contrast ratio', () => {
    const other = new OkColor(0.8, 0.2, 120, 1);
    const ratio = base.contrastRatio(other);
    expect(typeof ratio).toBe('number');
    expect(ratio).toBeGreaterThanOrEqual(1);
    expect(ratio).toBeLessThanOrEqual(21);
  });

  it('should create from hex string', () => {
    const color = OkColor.fromHex('#ff0000');
    expect(color).toBeInstanceOf(OkColor);
    expect(color.l).toBeGreaterThanOrEqual(0);
    expect(color.l).toBeLessThanOrEqual(1);
    expect(color.alpha).toBe(1);
  });

  it('should throw error for invalid hex', () => {
    expect(() => OkColor.fromHex('not-a-color')).toThrow();
    expect(() => OkColor.fromHex('#zzzzzz')).toThrow();
  });

  it('should create from RGB object', () => {
    const color = OkColor.fromRGB({ r: 255, g: 0, b: 0 });
    expect(color).toBeInstanceOf(OkColor);
    expect(color.l).toBeGreaterThanOrEqual(0);
    expect(color.l).toBeLessThanOrEqual(1);
  });

  it('should validate hex strings', () => {
    expect(OkColor.validateHex('#ff0000')).toBe(true);
    expect(OkColor.validateHex('ff0000')).toBe(true);
    expect(OkColor.validateHex('#f00')).toBe(true);
    expect(OkColor.validateHex('')).toBe(false);
    expect(OkColor.validateHex('not-a-color')).toBe(false);
    expect(OkColor.validateHex('#zzzzzz')).toBe(false);
  });
});
