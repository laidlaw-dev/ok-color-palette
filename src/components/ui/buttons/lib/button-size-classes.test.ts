import { getButtonSizeClasses } from './button-size-classes';

describe('getButtonSizeClasses', () => {
  it('returns correct classes for small size', () => {
    const classes = getButtonSizeClasses('small');

    expect(classes).toBe('px-2 py-1 text-sm');
  });

  it('returns correct classes for medium size', () => {
    const classes = getButtonSizeClasses('medium');

    expect(classes).toBe('px-3 py-1.5 text-base');
  });

  it('returns correct classes for large size', () => {
    const classes = getButtonSizeClasses('large');

    expect(classes).toBe('px-4 py-2 text-lg');
  });

  it('returns medium classes as default for unknown size', () => {
    // @ts-expect-error Testing invalid input
    const classes = getButtonSizeClasses('extra-large');

    expect(classes).toBe('px-3 py-1.5 text-base');
  });

  it('returns classes that include padding and text size', () => {
    const smallClasses = getButtonSizeClasses('small');
    const mediumClasses = getButtonSizeClasses('medium');
    const largeClasses = getButtonSizeClasses('large');

    expect(smallClasses).toMatch(/px-\d+/);
    expect(smallClasses).toMatch(/py-\d+/);
    expect(smallClasses).toMatch(/text-\w+/);

    expect(mediumClasses).toMatch(/px-\d+/);
    expect(mediumClasses).toMatch(/py-[\d.]+/);
    expect(mediumClasses).toMatch(/text-\w+/);

    expect(largeClasses).toMatch(/px-\d+/);
    expect(largeClasses).toMatch(/py-\d+/);
    expect(largeClasses).toMatch(/text-\w+/);
  });
});
