import type { ReactNode } from 'react';
import type { OkButtonVariant, OkSize } from '../ui-types';
import { BaseButton } from './components/BaseButton';
import { clsx } from 'clsx';

interface OkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: OkButtonVariant;
  size?: OkSize;
  className?: string;
  children: ReactNode;
}

/**
 * Renders a customizable button component with various styling options.
 *
 * @param variant - The visual style of the button. Defaults to `'filled'`.
 * @param size - The size of the button. Defaults to `'medium'`.
 * @param className - Additional CSS classes to apply to the button.
 * @param children - The content to display inside the button.
 * @param props - Additional props passed to the underlying `BaseButton` component.
 *
 * @returns A styled button component with customizable variant, padding, and content.
 */
export const OkButton = ({
  variant = 'filled',
  size = 'medium',
  className = '',
  children,
  ...props
}: OkButtonProps) => {
  const paddingClasses = 'px-2 py-1";';

  return (
    <BaseButton
      variant={variant}
      size={size}
      className={clsx('rounded-md', paddingClasses, { [className]: className })}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">{children}</div>
    </BaseButton>
  );
};
