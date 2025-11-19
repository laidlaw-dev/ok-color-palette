import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OkInput } from './OkInput';

describe('OkInput', () => {
  it('renders an input element', () => {
    render(<OkInput name="test" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with default text type', () => {
    render(<OkInput name="test" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with specified type', () => {
    render(<OkInput name="test" type="email" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders label when provided', () => {
    render(<OkInput name="test" label="Test Label" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    render(<OkInput name="test" />);

    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('applies default size classes', () => {
    render(<OkInput name="test" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('px-4', 'py-2');
  });

  it('applies small size classes when small prop is true', () => {
    render(<OkInput name="test" small />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('px-2', 'py-1', 'text-sm');
  });

  it('applies default border and background classes', () => {
    render(<OkInput name="test" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass(
      'rounded-md',
      'border',
      'bg-control',
      'text-foreground',
      'border-border-control'
    );
  });

  it('applies transition classes', () => {
    render(<OkInput name="test" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('transition', 'duration-250', 'ease-in-out');
  });

  it('applies focus shadow classes on focus', async () => {
    const user = userEvent.setup();
    render(<OkInput name="test" />);
    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(input).toHaveClass('shadow-full-large', 'shadow-shadow-primary');
  });

  it('applies small focus shadow classes when small prop is true', async () => {
    const user = userEvent.setup();
    render(<OkInput name="test" small />);
    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(input).toHaveClass('shadow-full-small', 'shadow-shadow-primary');
  });

  it('applies disabled classes when disabled', () => {
    render(<OkInput name="test" disabled />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass(
      'bg-disabled',
      'text-on-disabled',
      'cursor-not-allowed'
    );
    expect(input).toBeDisabled();
  });

  it('does not apply bg-control classes when disabled', () => {
    render(<OkInput name="test" disabled />);
    const input = screen.getByRole('textbox');

    expect(input).not.toHaveClass('bg-control', 'text-foreground');
  });

  it('displays error description when isTouched and error are provided', () => {
    render(<OkInput name="test" isTouched error="Error message" />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('does not display error when not touched', () => {
    render(<OkInput name="test" error="Error message" />);

    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  it('does not display error when touched but no error', () => {
    render(<OkInput name="test" isTouched />);

    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  it('does not display error when disabled', () => {
    render(<OkInput name="test" isTouched error="Error message" disabled />);

    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });

  it('applies error border classes when touched and has error', () => {
    render(<OkInput name="test" isTouched error="Error message" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('border-border-error');
  });

  it('does not apply error border when not touched', () => {
    render(<OkInput name="test" error="Error message" />);
    const input = screen.getByRole('textbox');

    expect(input).not.toHaveClass('border-border-error');
    expect(input).toHaveClass('border-border-control');
  });

  it('applies error shadow on focus when touched and has error', async () => {
    const user = userEvent.setup();
    render(<OkInput name="test" isTouched error="Error message" />);
    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(input).toHaveClass('shadow-full-large', 'shadow-shadow-error');
    expect(input).not.toHaveClass('shadow-shadow-primary');
  });

  it('applies small error shadow when small and has error', async () => {
    const user = userEvent.setup();
    render(<OkInput name="test" small isTouched error="Error message" />);
    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(input).toHaveClass('shadow-full-small', 'shadow-shadow-error');
  });

  it('forwards value prop to input', () => {
    render(<OkInput name="test" value="test value" onChange={vi.fn()} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('test value');
  });

  it('forwards placeholder prop to input', () => {
    render(<OkInput name="test" placeholder="Enter text" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  it('forwards name prop to input', () => {
    render(<OkInput name="test-name" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('name', 'test-name');
  });

  it('calls onChange handler when value changes', async () => {
    const mock_onChange = vi.fn();
    const user = userEvent.setup();
    render(<OkInput name="test" onChange={mock_onChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'a');

    expect(mock_onChange).toHaveBeenCalled();
  });

  it('forwards additional props to input element', () => {
    render(
      <OkInput name="test" data-testid="test-input" aria-label="Test Input" />
    );
    const input = screen.getByTestId('test-input');

    expect(input).toHaveAttribute('aria-label', 'Test Input');
  });

  it('does not apply focus shadow when disabled', async () => {
    const user = userEvent.setup();
    render(<OkInput name="test" disabled />);
    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(input).not.toHaveClass('shadow-full-large', 'shadow-shadow-primary');
  });

  it('applies correct classes for all states combined', () => {
    const { rerender } = render(<OkInput name="test" />);
    const input = screen.getByRole('textbox');

    // Default state
    expect(input).toHaveClass(
      'px-4',
      'py-2',
      'bg-control',
      'border-border-control'
    );

    // Small state
    rerender(<OkInput name="test" small />);
    expect(input).toHaveClass('px-2', 'py-1', 'text-sm');

    // Error state
    rerender(<OkInput name="test" isTouched error="Error" />);
    expect(input).toHaveClass('border-border-error');
    expect(screen.getByText('Error')).toBeInTheDocument();

    // Disabled state
    rerender(<OkInput name="test" disabled />);
    expect(input).toHaveClass(
      'bg-disabled',
      'text-on-disabled',
      'cursor-not-allowed'
    );
    expect(input).toBeDisabled();
  });
});
