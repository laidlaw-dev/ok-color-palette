import type { OkButtonVariant } from '../../ui-types';

interface OkButtonClasses {
  colors: string;
  shadows: string;
}
type OkButtonVariantClasses = Record<OkButtonVariant, OkButtonClasses>;
interface OkButtonStateClasses {
  base: OkButtonVariantClasses;
  hover: OkButtonVariantClasses;
  active: OkButtonVariantClasses;
  focus: OkButtonVariantClasses;
  disabled: Record<OkButtonVariant, string>;
}

const buttonClasses: OkButtonStateClasses = {
  base: {
    filled: {
      colors: 'bg-primary text-on-primary',
      shadows: '',
    },
    outlined: {
      colors: 'bg-transparent text-primary border border-border-primary',
      shadows: '',
    },
    text: {
      colors: 'bg-transparent text-primary',
      shadows: '',
    },
  },
  hover: {
    filled: {
      colors: 'bg-primary text-on-primary',
      shadows: 'shadow-full-small shadow-shadow-primary',
    },
    outlined: {
      colors: 'bg-primary/20 text-primary border border-border-primary',
      shadows: '',
    },
    text: {
      colors:
        'bg-radial-[at_50%_50%] from-primary/20 to-transparent at-50% text-primary',
      shadows: '',
    },
  },
  active: {
    filled: {
      colors: 'bg-primary text-on-primary',
      shadows: 'shadow-full-large shadow-shadow-primary',
    },
    outlined: {
      colors: 'bg-primary/20 text-primary border border-border-primary',
      shadows: 'shadow-full-large shadow-shadow-primary',
    },
    text: {
      colors:
        'bg-radial-[at_50%_50%] from-primary/20 to-primary/10 at-80% text-primary',
      shadows: 'shadow-full-large shadow-shadow-primary',
    },
  },
  focus: {
    filled: {
      colors: '',
      shadows: 'shadow-full-large shadow-primary/50',
    },
    outlined: {
      colors: '',
      shadows: 'shadow-full-large shadow-primary/50',
    },
    text: {
      colors: '',
      shadows: 'shadow-full-large shadow-primary/50',
    },
  },
  disabled: {
    filled: 'bg-disabled text-on-disabled',
    outlined: 'bg-transparent text-disabled border border-border-disabled',
    text: 'bg-transparent text-disabled',
  },
};

/**
 * Returns an object containing CSS class names for different button states
 * (base, hover, active, focus, disabled) based on the provided button variant.
 *
 * @param variant - The variant of the button to retrieve color classes for.
 * @returns An object mapping each button state to its corresponding CSS class name.
 */
export const getButtonColorClasses = (variant: OkButtonVariant) => {
  return {
    base: buttonClasses.base[variant],
    hover: buttonClasses.hover[variant],
    active: buttonClasses.active[variant],
    focus: buttonClasses.focus[variant],
    disabled: buttonClasses.disabled[variant],
  };
};
