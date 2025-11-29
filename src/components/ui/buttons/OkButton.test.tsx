import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OkButton } from './OkButton';
import { getButtonColorClasses } from './lib/button-color-classes';
import { getButtonSizeClasses } from './lib/button-size-classes';

describe('OkButton', () => {
  it('renders children correctly', () => {
    render(<OkButton>Click me</OkButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('wraps children in a flex container with gap', () => {
    render(<OkButton>Button Text</OkButton>);
    const button = screen.getByRole('button');
    const wrapper = button.querySelector('div');

    expect(wrapper).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'gap-2'
    );
  });

  it('applies rounded-md class by default', () => {
    render(<OkButton>Button</OkButton>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('rounded-md');
  });

  it('applies default filled variant classes', () => {
    render(<OkButton>Button</OkButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    expect(button.className).toContain(colorClasses.base.colors);
  });

  it('applies outlined variant classes when variant is outlined', () => {
    render(<OkButton variant="outlined">Button</OkButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('outlined');

    expect(button.className).toContain(colorClasses.base.colors);
  });

  it('applies text variant classes when variant is text', () => {
    render(<OkButton variant="text">Button</OkButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('text');

    expect(button.className).toContain(colorClasses.base.colors);
  });

  it('applies default medium size classes', () => {
    render(<OkButton>Button</OkButton>);
    const button = screen.getByRole('button');
    const sizeClasses = getButtonSizeClasses('medium');

    expect(button).toHaveClass(sizeClasses);
  });

  it('applies small size classes when size is small', () => {
    render(<OkButton size="small">Button</OkButton>);
    const button = screen.getByRole('button');
    const sizeClasses = getButtonSizeClasses('small');

    expect(button).toHaveClass(sizeClasses);
  });

  it('applies large size classes when size is large', () => {
    render(<OkButton size="large">Button</OkButton>);
    const button = screen.getByRole('button');
    const sizeClasses = getButtonSizeClasses('large');

    expect(button).toHaveClass(sizeClasses);
  });

  it('applies custom className', () => {
    render(<OkButton className="custom-class">Button</OkButton>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });

  it('applies both default and custom classes together', () => {
    render(<OkButton className="custom-class">Button</OkButton>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('rounded-md', 'custom-class');
  });

  it('applies disabled classes when disabled', () => {
    render(<OkButton disabled>Button</OkButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    expect(button).toHaveClass(colorClasses.disabled);
    expect(button).toBeDisabled();
  });

  it('applies hover classes on hover', async () => {
    const user = userEvent.setup();
    render(<OkButton>Button</OkButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.hover(button);
    expect(button.className).toContain(colorClasses.hover.colors);
  });

  it('applies active classes on mouse down', async () => {
    const user = userEvent.setup();
    render(<OkButton>Button</OkButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.pointer({ keys: '[MouseLeft>]', target: button });
    expect(button.className).toContain(colorClasses.active.colors);
  });

  it('applies focus classes on focus', async () => {
    const user = userEvent.setup();
    render(<OkButton>Button</OkButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.tab();
    expect(button.className).toContain(colorClasses.focus.colors);
  });

  it('forwards onClick handler to BaseButton', async () => {
    const mock_onClick = vi.fn();
    const user = userEvent.setup();
    render(<OkButton onClick={mock_onClick}>Button</OkButton>);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(mock_onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards additional props to BaseButton', () => {
    render(
      <OkButton data-testid="test-button" aria-label="Test Button">
        Button
      </OkButton>
    );
    const button = screen.getByTestId('test-button');

    expect(button).toHaveAttribute('aria-label', 'Test Button');
  });

  it('applies correct classes for different variant and size combinations', () => {
    const { rerender } = render(
      <OkButton variant="outlined" size="small">
        Button
      </OkButton>
    );
    const button = screen.getByRole('button');

    const outlinedColorClasses = getButtonColorClasses('outlined');
    const smallSizeClasses = getButtonSizeClasses('small');

    expect(button.className).toContain(outlinedColorClasses.base.colors);
    expect(button).toHaveClass(smallSizeClasses);
    expect(button).toHaveClass('rounded-md');

    rerender(
      <OkButton variant="text" size="large">
        Button
      </OkButton>
    );

    const textColorClasses = getButtonColorClasses('text');
    const largeSizeClasses = getButtonSizeClasses('large');

    expect(button.className).toContain(textColorClasses.base.colors);
    expect(button).toHaveClass(largeSizeClasses);
    expect(button).toHaveClass('rounded-md');
  });

  it('does not apply hover classes when disabled', async () => {
    const user = userEvent.setup();
    render(<OkButton disabled>Button</OkButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.hover(button);
    expect(button.className).not.toContain(colorClasses.hover.colors);
    expect(button).toHaveClass(colorClasses.disabled);
  });

  it('renders complex children correctly', () => {
    render(
      <OkButton>
        <span>Icon</span>
        <span>Label</span>
      </OkButton>
    );
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Icon');
    expect(button).toHaveTextContent('Label');
  });
});
