import { render, screen } from '@testing-library/react';
import { Field } from '@headlessui/react';
import { OkInputLabel } from './OkInputLabel';

describe('OkInputLabel', () => {
  it('renders children correctly', () => {
    render(
      <Field>
        <OkInputLabel>Label text</OkInputLabel>
      </Field>
    );

    expect(screen.getByText('Label text')).toBeInTheDocument();
  });

  it('applies default text size classes', () => {
    render(
      <Field>
        <OkInputLabel>Label text</OkInputLabel>
      </Field>
    );
    const label = screen.getByText('Label text');

    expect(label).toHaveClass('text-sm', 'text-label');
  });

  it('applies small text size classes when small prop is true', () => {
    render(
      <Field>
        <OkInputLabel small>Label text</OkInputLabel>
      </Field>
    );
    const label = screen.getByText('Label text');

    expect(label).toHaveClass('text-xs', 'text-label');
  });

  it('applies label text color class when not disabled', () => {
    render(
      <Field>
        <OkInputLabel>Label text</OkInputLabel>
      </Field>
    );
    const label = screen.getByText('Label text');

    expect(label).toHaveClass('text-label');
    expect(label).not.toHaveClass('text-disabled');
  });

  it('applies disabled text color class when disabled', () => {
    render(
      <Field>
        <OkInputLabel disabled>Label text</OkInputLabel>
      </Field>
    );
    const label = screen.getByText('Label text');

    expect(label).toHaveClass('text-disabled');
    expect(label).not.toHaveClass('text-label');
  });

  it('applies both small and disabled classes when both props are true', () => {
    render(
      <Field>
        <OkInputLabel small disabled>
          Label text
        </OkInputLabel>
      </Field>
    );
    const label = screen.getByText('Label text');

    expect(label).toHaveClass('text-xs', 'text-disabled');
    expect(label).not.toHaveClass('text-sm', 'text-label');
  });

  it('renders complex children correctly', () => {
    render(
      <Field>
        <OkInputLabel>
          <span>Field:</span> <strong>Name</strong>
        </OkInputLabel>
      </Field>
    );
    expect(screen.getByText('Field:')).not.toBeNull();
    expect(screen.getByText('Name')).not.toBeNull();
  });

  it('applies correct classes when toggling small prop', () => {
    const { rerender } = render(
      <Field>
        <OkInputLabel>Label text</OkInputLabel>
      </Field>
    );
    const label = screen.getByText('Label text');

    expect(label).toHaveClass('text-sm', 'text-label');
    expect(label).not.toHaveClass('text-xs');

    rerender(
      <Field>
        <OkInputLabel small>Label text</OkInputLabel>
      </Field>
    );

    expect(label).toHaveClass('text-xs', 'text-label');
    expect(label).not.toHaveClass('text-sm');
  });

  it('applies correct classes when toggling disabled prop', () => {
    const { rerender } = render(
      <Field>
        <OkInputLabel>Label text</OkInputLabel>
      </Field>
    );
    const label = screen.getByText('Label text');

    expect(label).toHaveClass('text-label');
    expect(label).not.toHaveClass('text-disabled');

    rerender(
      <Field>
        <OkInputLabel disabled>Label text</OkInputLabel>
      </Field>
    );

    expect(label).toHaveClass('text-disabled');
    expect(label).not.toHaveClass('text-label');
  });

  it('renders as a Label component from headlessui', () => {
    const { container } = render(
      <Field>
        <OkInputLabel>Label text</OkInputLabel>
      </Field>
    );
    const label = container.querySelector('[data-headlessui-state]');

    expect(label).toBeInTheDocument();
  });

  it('renders multiple labels independently', () => {
    render(
      <>
        <Field>
          <OkInputLabel>First label</OkInputLabel>
        </Field>
        <Field>
          <OkInputLabel small disabled>
            Second label
          </OkInputLabel>
        </Field>
      </>
    );

    const firstLabel = screen.getByText('First label');
    const secondLabel = screen.getByText('Second label');

    expect(firstLabel).toHaveClass('text-sm', 'text-label');
    expect(secondLabel).toHaveClass('text-xs', 'text-disabled');
  });

  it('applies correct classes for all prop combinations', () => {
    const { rerender } = render(
      <Field>
        <OkInputLabel>Label text</OkInputLabel>
      </Field>
    );
    const label = screen.getByText('Label text');

    // Default state
    expect(label).toHaveClass('text-sm', 'text-label');

    // Small only
    rerender(
      <Field>
        <OkInputLabel small>Label text</OkInputLabel>
      </Field>
    );
    expect(label).toHaveClass('text-xs', 'text-label');

    // Disabled only
    rerender(
      <Field>
        <OkInputLabel disabled>Label text</OkInputLabel>
      </Field>
    );
    expect(label).toHaveClass('text-sm', 'text-disabled');

    // Small and disabled
    rerender(
      <Field>
        <OkInputLabel small disabled>
          Label text
        </OkInputLabel>
      </Field>
    );
    expect(label).toHaveClass('text-xs', 'text-disabled');
  });
});
