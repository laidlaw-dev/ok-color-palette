import { Label } from '@headlessui/react';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface OkInputLabelProps {
  small?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

/**
 * Renders a styled label component with optional size and disabled state.
 *
 * @param small - If true, applies a smaller text size to the label.
 * @param disabled - If true, applies a neutral text color to indicate a disabled state.
 * @param children - The content to be displayed inside the label.
 */
export const OkInputLabel = ({
  small,
  disabled,
  children,
}: OkInputLabelProps) => {
  const labelSizeClass = small ? 'text-xs' : 'text-sm';

  return (
    <Label
      className={clsx(labelSizeClass, {
        'text-label': !disabled,
        'text-disabled': disabled,
      })}
    >
      {children}
    </Label>
  );
};
