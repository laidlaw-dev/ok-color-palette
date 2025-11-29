import { Button } from '@headlessui/react';
import { Fragment, type ReactNode } from 'react';
import { getButtonColorClasses } from '../lib/button-color-classes';
import { clsx } from 'clsx';
import type { OkButtonVariant, OkSize } from '../../ui-types';
import { getButtonSizeClasses } from '../lib/button-size-classes';

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: OkButtonVariant;
  size?: OkSize;
  className?: string;
  children: ReactNode;
}

/**
 * Renders a customizable button component with support for different visual variants and states.
 *
 * @param variant - The visual style of the button. Defaults to `'filled'`.
 * @param size - The size of the button. Defaults to `'medium'`.
 * @param className - Additional CSS classes to apply to the button.
 * @param children - The content to display inside the button.
 * @param props - Additional props passed to the underlying button element.
 *
 * The BaseButton is the base component for buttons.
 * It handles the visual styling based on the variant and state (hover, active, focus, disabled).
 */
export const BaseButton = ({
  variant = 'filled',
  size = 'medium',
  className = '',
  children,
  ...props
}: BaseButtonProps) => {
  return (
    <Button as={Fragment} disabled={props.disabled}>
      {({ disabled, hover, active, focus }) => {
        const colorClasses = getButtonColorClasses(variant);
        const sizeClasses = getButtonSizeClasses(size);
        return (
          <button
            {...props}
            className={clsx('transition duration-250 ease-in-out', {
              [sizeClasses]: true,
              [className]: className,
              ['cursor-pointer']: !disabled,
              [`${colorClasses.base.colors} ${colorClasses.base.shadows}`]:
                !disabled && !active && !hover,
              [`${colorClasses.hover.colors} ${colorClasses.hover.shadows}`]:
                !disabled && hover && !active,
              [`${colorClasses.active.colors} ${colorClasses.active.shadows}`]:
                !disabled && active,
              [`${colorClasses.focus.colors} ${colorClasses.focus.shadows}`]:
                !disabled && !active && !hover && focus,
              [`${colorClasses.disabled} cursor-not-allowed`]: disabled,
            })}
          >
            {children}
          </button>
        );
      }}
    </Button>
  );
};
