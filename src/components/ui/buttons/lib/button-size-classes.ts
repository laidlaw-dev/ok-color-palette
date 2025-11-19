import type { OkSize } from '../../ui-types';

/**
 * Returns the appropriate Tailwind CSS classes for button sizing based on the provided size parameter.
 *
 * @param size - The desired button size. Accepts 'small', 'medium', or 'large'.
 * @returns A string containing Tailwind CSS classes for padding and text size.
 *
 * @example
 * ```typescript
 * getButtonSizeClasses('small');  // Returns: 'px-2 py-1 text-sm'
 * getButtonSizeClasses('medium'); // Returns: 'px-3 py-1.5 text-base'
 * getButtonSizeClasses('large');  // Returns: 'px-4 py-2 text-lg'
 * ```
 */
export const getButtonSizeClasses = (size: OkSize) => {
  switch (size) {
    case 'small':
      return 'px-2 py-1 text-sm';
    case 'medium':
      return 'px-3 py-1.5 text-base';
    case 'large':
      return 'px-4 py-2 text-lg';
    default:
      return 'px-3 py-1.5 text-base';
  }
};
