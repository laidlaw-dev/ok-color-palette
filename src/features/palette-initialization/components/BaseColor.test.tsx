import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseColor } from './BaseColor';
import { OkColor, generateComplementaryColors } from '@/lib/color';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('BaseColor', () => {
  const mock_color = new OkColor(0.5, 0.2, 120, 1);
  const mock_onChange = vi.fn();
  const mock_complementaryColors = generateComplementaryColors(mock_color);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    expect(screen.getByText('Primary Color')).toBeInTheDocument();
  });

  it('displays the label text', () => {
    render(
      <BaseColor
        label="Test Label"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders the ColorSwatch component', () => {
    const { container } = render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    const swatch = container.querySelector('div[style*="background"]');
    expect(swatch).toBeInTheDocument();
  });

  it('applies full width and h-16 classes to ColorSwatch', () => {
    const { container } = render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    const swatch = container.querySelector('.h-16.w-full');
    expect(swatch).toBeInTheDocument();
  });

  it('renders the HexColorPicker component', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('passes color value to HexColorPicker', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(mock_color.toHex());
  });

  it('calls onChange when hex input changes', async () => {
    const user = userEvent.setup();
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.click(input);
    const editiableInput = screen.getByRole('textbox') as HTMLInputElement;
    await user.clear(editiableInput);
    await user.type(editiableInput, '#FF0000');

    expect(mock_onChange).toHaveBeenCalled();
  });

  it('applies card styling classes', () => {
    const { container } = render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      'bg-surface',
      'border-border-surface',
      'rounded',
      'border',
      'p-2',
      'shadow'
    );
  });

  it('applies fixed width of w-64', () => {
    const { container } = render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('w-64');
  });

  it('does not render SuggestedColors when complementaryColors is undefined', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    expect(screen.queryByText('common.suggested')).not.toBeInTheDocument();
  });

  it('renders SuggestedColors when complementaryColors is provided', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    expect(screen.getByText('common.suggested')).toBeInTheDocument();
  });

  it('renders complementary color button', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders split complement color buttons', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const buttons = screen.getAllByRole('button');
    // 1 complementary + 2 split complements + 2 triadic + 4 analogous = 9 buttons
    expect(buttons).toHaveLength(9);
  });

  it('renders triadic color buttons', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(9);
  });

  it('renders analogous color buttons', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(9);
  });

  it('calls onChange when complementary color button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);

    expect(mock_onChange).toHaveBeenCalledWith(
      mock_complementaryColors.complementary[0]
    );
  });

  it('calls onChange when split complement button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);

    expect(mock_onChange).toHaveBeenCalledWith(
      mock_complementaryColors.splitComplements[0]
    );
  });

  it('calls onChange when triadic button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[3]);

    expect(mock_onChange).toHaveBeenCalledWith(
      mock_complementaryColors.triadic[0]
    );
  });

  it('calls onChange when analogous button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[5]);

    expect(mock_onChange).toHaveBeenCalledWith(
      mock_complementaryColors.analogous[0]
    );
  });

  it('applies suggested colors section styling', () => {
    const { container } = render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const suggestedSection = container.querySelector('.flex.flex-col.gap-2');
    expect(suggestedSection).toBeInTheDocument();
  });

  it('displays suggested colors label with translation key', () => {
    render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
        complementaryColors={mock_complementaryColors}
      />
    );

    const labels = screen.getAllByText('common.suggested');
    expect(labels).toHaveLength(1);
  });

  it('handles different colors correctly', () => {
    const mock_newColor = new OkColor(0.7, 0.3, 240, 1);
    render(
      <BaseColor
        label="Secondary Color"
        color={mock_newColor}
        onChange={mock_onChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(mock_newColor.toHex());
  });

  it('updates when color prop changes', () => {
    const mock_newColor = new OkColor(0.7, 0.3, 240, 1);
    const { rerender } = render(
      <BaseColor
        label="Primary Color"
        color={mock_color}
        onChange={mock_onChange}
      />
    );

    rerender(
      <BaseColor
        label="Primary Color"
        color={mock_newColor}
        onChange={mock_onChange}
      />
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(mock_newColor.toHex());
  });
});
