import { Description } from '@headlessui/react';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface OKErrorDescriptionProps {
  small?: boolean;
  children: ReactNode;
}

/**
 * Renders an error description with customizable text size.
 *
 * @param small - If `true`, applies a smaller text size (`text-xs`). Otherwise, uses the default size (`text-sm`).
 * @param children - The content to display inside the error description.
 *
 * @returns A styled error description component.
 */
export const OkErrorDescription = ({
  small,
  children,
}: OKErrorDescriptionProps) => {
  const labelSizeClass = small ? 'text-xs' : 'text-sm';

  return (
    <Description className={clsx(labelSizeClass, 'text-error')}>
      {children}
    </Description>
  );
};
