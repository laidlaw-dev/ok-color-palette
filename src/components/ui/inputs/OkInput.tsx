import { Field, Input } from '@headlessui/react';
import { clsx } from 'clsx';
import { Fragment, type Ref } from 'react';
import { OkInputLabel } from './OkInputLabel';
import { OkErrorDescription } from './OkErrorDescription';

interface OkInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isTouched?: boolean;
  error?: string;
  small?: boolean;
  ref?: Ref<HTMLInputElement>;
}

/**
 * Renders a customizable input field with label and error description.
 *
 * @remarks
 * - Supports different input types, sizes, and disabled state.
 * - Displays a label and error message if provided.
 * - Applies conditional styling based on focus, size, and disabled state.
 *
 * @param type - The type of the input element (default: 'text').
 * @param name - The name attribute for the input element.
 * @param label - The label to display above the input.
 * @param disabled - Whether the input is disabled.
 * @param isTouched - Indicates if the input has been interacted with.
 * @param error - The error message to display below the input.
 * @param small - Whether to render a smaller input variant.
 * @param props - Additional props passed to the input element.
 *
 * @returns A React element containing the input, label, and error description.
 */
export const OkInput = ({
  type = 'text',
  name,
  label,
  disabled,
  isTouched,
  error,
  small,
  ref,
  ...props
}: OkInputProps) => {
  const ctrlSizeClass = small ? 'px-2 py-1 text-sm' : 'px-4 py-2';
  const shadowClass = small ? 'shadow-full-small' : 'shadow-full-large';
  const isNotValid = isTouched && error && !disabled;
  return (
    <Field disabled={disabled} className="flex flex-col gap-1">
      {label && (
        <OkInputLabel small={small} disabled={disabled}>
          {label}
        </OkInputLabel>
      )}
      <Input as={Fragment}>
        {({ focus, disabled }) => {
          return (
            <input
              ref={ref}
              type={type}
              value={props.value}
              onChange={props.onChange}
              placeholder={props.placeholder}
              name={name}
              className={clsx(
                `rounded-md border transition duration-250 ease-in-out ${ctrlSizeClass}`,
                {
                  'bg-control text-foreground': !disabled,
                },
                {
                  'border-border-control': !disabled && !isNotValid,
                },
                {
                  [`${shadowClass} shadow-shadow-primary`]:
                    focus && !isNotValid,
                },
                {
                  'bg-disabled text-on-disabled cursor-not-allowed': disabled,
                },
                {
                  'border-border-error': isNotValid,
                },
                {
                  [`${shadowClass} shadow-shadow-error`]: focus && isNotValid,
                }
              )}
              {...props}
            />
          );
        }}
      </Input>
      {isNotValid && (
        <OkErrorDescription small={small}>{error}</OkErrorDescription>
      )}
    </Field>
  );
};
