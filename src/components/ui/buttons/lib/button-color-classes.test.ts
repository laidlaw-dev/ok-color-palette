import { getButtonColorClasses } from './button-color-classes';

describe('getButtonColorClasses', () => {
  it('returns correct classes for filled variant', () => {
    const classes = getButtonColorClasses('filled');

    expect(classes.base).toEqual({
      colors: 'bg-primary text-on-primary',
      shadows: '',
    });
    expect(classes.hover).toEqual({
      colors: 'bg-primary text-on-primary',
      shadows: 'shadow-full-small shadow-shadow-primary',
    });
    expect(classes.active).toEqual({
      colors: 'bg-primary text-on-primary',
      shadows: 'shadow-full-large shadow-shadow-primary',
    });
    expect(classes.focus).toEqual({
      colors: '',
      shadows: 'shadow-full-large shadow-primary/50',
    });
    expect(classes.disabled).toBe('bg-disabled text-on-disabled');
  });

  it('returns correct classes for outlined variant', () => {
    const classes = getButtonColorClasses('outlined');

    expect(classes.base).toEqual({
      colors: 'bg-transparent text-primary border border-border-primary',
      shadows: '',
    });
    expect(classes.hover).toEqual({
      colors: 'bg-primary/20 text-primary border border-border-primary',
      shadows: '',
    });
    expect(classes.active).toEqual({
      colors: 'bg-primary/20 text-primary border border-border-primary',
      shadows: 'shadow-full-large shadow-shadow-primary',
    });
    expect(classes.focus).toEqual({
      colors: '',
      shadows: 'shadow-full-large shadow-primary/50',
    });
    expect(classes.disabled).toBe(
      'bg-transparent text-disabled border border-border-disabled'
    );
  });

  it('returns correct classes for text variant', () => {
    const classes = getButtonColorClasses('text');

    expect(classes.base).toEqual({
      colors: 'bg-transparent text-primary',
      shadows: '',
    });
    expect(classes.hover).toEqual({
      colors:
        'bg-radial-[at_50%_50%] from-primary/20 to-transparent at-50% text-primary',
      shadows: '',
    });
    expect(classes.active).toEqual({
      colors:
        'bg-radial-[at_50%_50%] from-primary/20 to-primary/10 at-80% text-primary',
      shadows: 'shadow-full-large shadow-shadow-primary',
    });
    expect(classes.focus).toEqual({
      colors: '',
      shadows: 'shadow-full-large shadow-primary/50',
    });
    expect(classes.disabled).toBe('bg-transparent text-disabled');
  });

  it('returns an object with all required state properties', () => {
    const classes = getButtonColorClasses('filled');

    expect(classes).toHaveProperty('base');
    expect(classes).toHaveProperty('hover');
    expect(classes).toHaveProperty('active');
    expect(classes).toHaveProperty('focus');
    expect(classes).toHaveProperty('disabled');
  });

  it('returns state objects with colors and shadows for base, hover, active, and focus', () => {
    const classes = getButtonColorClasses('outlined');

    expect(classes.base).toHaveProperty('colors');
    expect(classes.base).toHaveProperty('shadows');
    expect(classes.hover).toHaveProperty('colors');
    expect(classes.hover).toHaveProperty('shadows');
    expect(classes.active).toHaveProperty('colors');
    expect(classes.active).toHaveProperty('shadows');
    expect(classes.focus).toHaveProperty('colors');
    expect(classes.focus).toHaveProperty('shadows');
  });

  it('returns disabled as a string value', () => {
    const filledClasses = getButtonColorClasses('filled');
    const outlinedClasses = getButtonColorClasses('outlined');
    const textClasses = getButtonColorClasses('text');

    expect(typeof filledClasses.disabled).toBe('string');
    expect(typeof outlinedClasses.disabled).toBe('string');
    expect(typeof textClasses.disabled).toBe('string');
  });
});
