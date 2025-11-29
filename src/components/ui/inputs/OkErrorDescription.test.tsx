import { render, screen } from '@testing-library/react';
import { Field } from '@headlessui/react';
import { OkErrorDescription } from './OkErrorDescription';

describe('OkErrorDescription', () => {
  it('renders children correctly', () => {
    render(
      <Field>
        <OkErrorDescription>Error message</OkErrorDescription>
      </Field>
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies default text size classes', () => {
    render(
      <Field>
        <OkErrorDescription>Error message</OkErrorDescription>
      </Field>
    );
    const description = screen.getByText('Error message');

    expect(description).toHaveClass('text-sm', 'text-error');
  });

  it('applies small text size classes when small prop is true', () => {
    render(
      <Field>
        <OkErrorDescription small>Error message</OkErrorDescription>
      </Field>
    );
    const description = screen.getByText('Error message');

    expect(description).toHaveClass('text-xs', 'text-error');
  });

  it('applies error text color class', () => {
    render(
      <Field>
        <OkErrorDescription>Error message</OkErrorDescription>
      </Field>
    );
    const description = screen.getByText('Error message');

    expect(description).toHaveClass('text-error');
  });

  it('renders complex children correctly', () => {
    render(
      <Field>
        <OkErrorDescription>
          <span>Error:</span> <strong>Something went wrong</strong>
        </OkErrorDescription>
      </Field>
    );
    expect(screen.getByText('Error:')).not.toBeNull();
    expect(screen.getByText('Something went wrong')).not.toBeNull();
  });

  it('applies correct classes when toggling small prop', () => {
    const { rerender } = render(
      <Field>
        <OkErrorDescription>Error message</OkErrorDescription>
      </Field>
    );
    const description = screen.getByText('Error message');

    expect(description).toHaveClass('text-sm', 'text-error');
    expect(description).not.toHaveClass('text-xs');

    rerender(
      <Field>
        <OkErrorDescription small>Error message</OkErrorDescription>
      </Field>
    );

    expect(description).toHaveClass('text-xs', 'text-error');
    expect(description).not.toHaveClass('text-sm');
  });

  it('renders as a Description component from headlessui', () => {
    const { container } = render(
      <Field>
        <OkErrorDescription>Error message</OkErrorDescription>
      </Field>
    );
    const description = container.querySelector('[data-headlessui-state]');

    expect(description).toBeInTheDocument();
  });

  it('renders multiple error descriptions independently', () => {
    render(
      <>
        <Field>
          <OkErrorDescription>First error</OkErrorDescription>
        </Field>
        <Field>
          <OkErrorDescription small>Second error</OkErrorDescription>
        </Field>
      </>
    );

    const firstError = screen.getByText('First error');
    const secondError = screen.getByText('Second error');

    expect(firstError).toHaveClass('text-sm', 'text-error');
    expect(secondError).toHaveClass('text-xs', 'text-error');
  });
});
