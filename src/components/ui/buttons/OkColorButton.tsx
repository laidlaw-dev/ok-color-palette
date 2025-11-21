import { clsx } from 'clsx';
import type { OkSize } from '../ui-types';
import type { OkColor } from '@/lib/color';
import { Button } from '@headlessui/react';
import { getButtonColorClasses } from './lib/button-color-classes';
import { Fragment } from 'react';

interface OkColorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  okColor?: OkColor | null;
  size?: OkSize;
  className?: string;
}

export const OkColorButton = ({
  okColor,
  size = 'medium',
  className = '',
  ...props
}: OkColorButtonProps) => {
  const colorStyle =
    okColor != null
      ? { backgroundColor: okColor.toHex() }
      : {
          background:
            'radial-gradient(circle at 50%, #000000 0%, #FFFFFF 100%)',
          opacity: 0.5,
        };

  const sizeClasses = (() => {
    switch (size) {
      case 'small':
        return 'h-6 w-6';
      case 'large':
        return 'h-12 w-12';
      case 'medium':
      default:
        return 'h-8 w-8';
    }
  })();

  return (
    <Button as={Fragment} disabled={props.disabled}>
      {({ disabled, hover, active, focus }) => {
        const colorClasses = getButtonColorClasses('filled');
        return (
          <button
            {...props}
            className={clsx(
              'overflow-hidden rounded transition duration-250 ease-in-out',
              {
                [sizeClasses]: true,
                [className]: className,
                ['cursor-pointer']: !disabled,
                [`${colorClasses.base.shadows}`]:
                  !disabled && !active && !hover,
                [`${colorClasses.hover.shadows}`]:
                  !disabled && hover && !active,
                [`${colorClasses.active.shadows}`]: !disabled && active,
                [`${colorClasses.focus.shadows}`]:
                  !disabled && !active && !hover && focus,
                [`${colorClasses.disabled} cursor-not-allowed`]: disabled,
              }
            )}
          >
            <div
              className={clsx(
                'transition-background border-border-primary rounded border duration-250 ease-in-out',
                [sizeClasses]
              )}
              style={colorStyle}
            />
          </button>
        );
      }}
    </Button>
  );
};
