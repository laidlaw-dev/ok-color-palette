import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BaseButton } from './BaseButton';
import { getButtonColorClasses } from '../lib/button-color-classes';
import { getButtonSizeClasses } from '../lib/button-size-classes';

describe('BaseButton', () => {
  it('renders children correctly', () => {
    render(<BaseButton>Click me</BaseButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('applies default variant and size classes', () => {
    render(<BaseButton>Button</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('transition', 'duration-250', 'ease-in-out');
  });

  it('applies filled variant classes by default', () => {
    render(<BaseButton>Button</BaseButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');
    expect(button.className).toContain(colorClasses.base.colors);
  });

  it('applies outlined variant classes when variant is outlined', () => {
    render(<BaseButton variant="outlined">Button</BaseButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('outlined');
    expect(button.className).toContain(colorClasses.base.colors);
  });

  it('applies text variant classes when variant is text', () => {
    render(<BaseButton variant="text">Button</BaseButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('text');
    expect(button.className).toContain(colorClasses.base.colors);
  });

  it('applies small size classes when size is small', () => {
    render(<BaseButton size="small">Button</BaseButton>);
    const button = screen.getByRole('button');
    const sizeClasses = getButtonSizeClasses('small');
    expect(button).toHaveClass(sizeClasses);
  });

  it('applies medium size classes by default', () => {
    render(<BaseButton>Button</BaseButton>);
    const button = screen.getByRole('button');
    const sizeClasses = getButtonSizeClasses('medium');
    expect(button).toHaveClass(sizeClasses);
  });

  it('applies large size classes when size is large', () => {
    render(<BaseButton size="large">Button</BaseButton>);
    const button = screen.getByRole('button');
    const sizeClasses = getButtonSizeClasses('large');
    expect(button).toHaveClass(sizeClasses);
  });

  it('applies custom className', () => {
    render(<BaseButton className="custom-class">Button</BaseButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('applies disabled classes when disabled', () => {
    render(<BaseButton disabled>Button</BaseButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');
    expect(button).toHaveClass(colorClasses.disabled);
    expect(button).toBeDisabled();
  });

  it('applies hover classes on hover', async () => {
    const user = userEvent.setup();
    render(<BaseButton>Button</BaseButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.hover(button);
    expect(button.className).toContain(colorClasses.hover.colors);
  });

  it('applies active classes on mouse down', async () => {
    const user = userEvent.setup();
    render(<BaseButton>Button</BaseButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.pointer({ keys: '[MouseLeft>]', target: button });
    expect(button.className).toContain(colorClasses.active.colors);
  });

  it('applies focus classes on focus', async () => {
    const user = userEvent.setup();
    render(<BaseButton>Button</BaseButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.tab();
    expect(button.className).toContain(colorClasses.focus.colors);
  });

  it('does not apply hover classes when disabled', async () => {
    const user = userEvent.setup();
    render(<BaseButton disabled>Button</BaseButton>);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.hover(button);
    expect(button.className).not.toContain(colorClasses.hover.colors);
    expect(button).toHaveClass(colorClasses.disabled);
  });

  it('forwards additional props to button element', () => {
    const mock_onClick = vi.fn();
    render(
      <BaseButton onClick={mock_onClick} data-testid="test-button">
        Button
      </BaseButton>
    );
    const button = screen.getByTestId('test-button');

    fireEvent.click(button);
    expect(mock_onClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct classes for different variant and size combinations', () => {
    const { rerender } = render(
      <BaseButton variant="outlined" size="small">
        Button
      </BaseButton>
    );
    const button = screen.getByRole('button');

    const outlinedColorClasses = getButtonColorClasses('outlined');
    const smallSizeClasses = getButtonSizeClasses('small');

    expect(button.className).toContain(outlinedColorClasses.base.colors);
    expect(button).toHaveClass(smallSizeClasses);

    rerender(
      <BaseButton variant="text" size="large">
        Button
      </BaseButton>
    );

    const textColorClasses = getButtonColorClasses('text');
    const largeSizeClasses = getButtonSizeClasses('large');

    expect(button.className).toContain(textColorClasses.base.colors);
    expect(button).toHaveClass(largeSizeClasses);
  });
});
