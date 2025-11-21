import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OkColorButton } from './OkColorButton';
import { OkColor } from '@/lib/color';
import { getButtonColorClasses } from './lib/button-color-classes';

describe('OkColorButton', () => {
  const mock_color = new OkColor(0.5, 0.2, 120, 1);

  it('renders a button element', () => {
    render(<OkColorButton okColor={mock_color} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies the color as background to inner div', () => {
    const { container } = render(<OkColorButton okColor={mock_color} />);
    const innerDiv = container.querySelector('div');

    expect(innerDiv).toHaveStyle({ backgroundColor: mock_color.toHex() });
  });

  it('applies default medium size classes', () => {
    render(<OkColorButton okColor={mock_color} />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('h-8', 'w-8');
  });

  it('applies small size classes when size is small', () => {
    render(<OkColorButton okColor={mock_color} size="small" />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('h-6', 'w-6');
  });

  it('applies large size classes when size is large', () => {
    render(<OkColorButton okColor={mock_color} size="large" />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('h-12', 'w-12');
  });

  it('applies rounded and transition classes to button', () => {
    render(<OkColorButton okColor={mock_color} />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(
      'rounded',
      'transition',
      'duration-250',
      'ease-in-out',
      'overflow-hidden'
    );
  });

  it('applies border and rounded classes to inner div', () => {
    const { container } = render(<OkColorButton okColor={mock_color} />);
    const innerDiv = container.querySelector('div');

    expect(innerDiv).toHaveClass(
      'border',
      'rounded',
      'border-border-primary',
      'transition-background',
      'duration-250',
      'ease-in-out'
    );
  });

  it('applies custom className to button', () => {
    render(<OkColorButton okColor={mock_color} className="custom-class" />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });

  it('applies base shadow classes when not hovered or active', () => {
    render(<OkColorButton okColor={mock_color} />);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    expect(button.className).toContain(colorClasses.base.shadows);
  });

  it('applies hover shadow classes on hover', async () => {
    const user = userEvent.setup();
    render(<OkColorButton okColor={mock_color} />);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.hover(button);
    expect(button.className).toContain(colorClasses.hover.shadows);
  });

  it('applies active shadow classes on mouse down', async () => {
    const user = userEvent.setup();
    render(<OkColorButton okColor={mock_color} />);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.pointer({ keys: '[MouseLeft>]', target: button });
    expect(button.className).toContain(colorClasses.active.shadows);
  });

  it('applies focus shadow classes on focus', async () => {
    const user = userEvent.setup();
    render(<OkColorButton okColor={mock_color} />);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.tab();
    expect(button.className).toContain(colorClasses.focus.shadows);
  });

  it('applies disabled classes when disabled', () => {
    render(<OkColorButton okColor={mock_color} disabled />);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    expect(button).toHaveClass(colorClasses.disabled, 'cursor-not-allowed');
    expect(button).toBeDisabled();
  });

  it('applies cursor-pointer class when not disabled', () => {
    render(<OkColorButton okColor={mock_color} />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('cursor-pointer');
  });

  it('does not apply hover shadow classes when disabled', async () => {
    const user = userEvent.setup();
    render(<OkColorButton okColor={mock_color} disabled />);
    const button = screen.getByRole('button');
    const colorClasses = getButtonColorClasses('filled');

    await user.hover(button);
    expect(button.className).not.toContain(colorClasses.hover.shadows);
    expect(button).toHaveClass(colorClasses.disabled);
  });

  it('handles null color with radial gradient', () => {
    const { container } = render(<OkColorButton okColor={null} />);
    const innerDiv = container.querySelector('div');

    expect(innerDiv).toHaveStyle({
      background: 'radial-gradient(circle at 50%, #000000 0%, #FFFFFF 100%)',
      opacity: '0.5',
    });
  });

  it('handles undefined color with radial gradient', () => {
    const { container } = render(<OkColorButton />);
    const innerDiv = container.querySelector('div');

    expect(innerDiv).toHaveStyle({
      background: 'radial-gradient(circle at 50%, #000000 0%, #FFFFFF 100%)',
      opacity: '0.5',
    });
  });

  it('applies size classes to both button and inner div', () => {
    const { container } = render(
      <OkColorButton okColor={mock_color} size="large" />
    );
    const button = screen.getByRole('button');
    const innerDiv = container.querySelector('div');

    expect(button).toHaveClass('h-12', 'w-12');
    expect(innerDiv).toHaveClass('h-12', 'w-12');
  });

  it('forwards onClick handler to button', async () => {
    const mock_onClick = vi.fn();
    const user = userEvent.setup();
    render(<OkColorButton okColor={mock_color} onClick={mock_onClick} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(mock_onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards additional props to button element', () => {
    render(
      <OkColorButton
        okColor={mock_color}
        data-testid="test-button"
        aria-label="Color Button"
      />
    );
    const button = screen.getByTestId('test-button');

    expect(button).toHaveAttribute('aria-label', 'Color Button');
  });

  it('renders with different colors', () => {
    const mock_red = new OkColor(0.6, 0.25, 20, 1);
    const mock_blue = new OkColor(0.5, 0.2, 240, 1);

    const { container: container1 } = render(
      <OkColorButton okColor={mock_red} />
    );
    const { container: container2 } = render(
      <OkColorButton okColor={mock_blue} />
    );

    const innerDiv1 = container1.querySelector('div');
    const innerDiv2 = container2.querySelector('div');

    expect(innerDiv1).toHaveStyle({ backgroundColor: mock_red.toHex() });
    expect(innerDiv2).toHaveStyle({ backgroundColor: mock_blue.toHex() });
  });

  it('handles colors with transparency', () => {
    const mock_transparent = new OkColor(0.5, 0.2, 120, 0.5);
    const { container } = render(<OkColorButton okColor={mock_transparent} />);
    const innerDiv = container.querySelector('div');

    expect(innerDiv).toHaveStyle({ backgroundColor: mock_transparent.toHex() });
  });

  it('applies correct classes for different size and state combinations', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <OkColorButton okColor={mock_color} size="small" />
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('h-6', 'w-6');

    await user.hover(button);
    const colorClasses = getButtonColorClasses('filled');
    expect(button.className).toContain(colorClasses.hover.shadows);

    rerender(<OkColorButton okColor={mock_color} size="large" disabled />);
    expect(button).toHaveClass('h-12', 'w-12', colorClasses.disabled);
  });

  it('does not apply cursor-pointer when disabled', () => {
    render(<OkColorButton okColor={mock_color} disabled />);
    const button = screen.getByRole('button');

    expect(button).not.toHaveClass('cursor-pointer');
    expect(button).toHaveClass('cursor-not-allowed');
  });
});
