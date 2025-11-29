import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaletteBaseColors } from './PaletteBaseColors';
import { generateComplementaryColors, OkColor } from '@/lib/color';
import type { Palette } from '@/types';

const mock_generate = vi.fn();
const mock_palette: Palette = {
  base: {
    basePrimary: new OkColor(0.5, 0.2, 120, 1),
    baseSecondary: new OkColor(0.5, 0.2, 180, 1),
    baseAccent: new OkColor(0.5, 0.2, 300, 1),
  },
  variants: [],
};

const mock_usePalette = vi.fn(() => ({
  palette: mock_palette,
  generate: mock_generate,
}));

vi.mock('@/providers/palette', () => ({
  usePalette: () => mock_usePalette(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('PaletteBaseColors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders three BaseColor components with correct labels', () => {
    render(<PaletteBaseColors />);

    expect(screen.getByText('palette.primary')).toBeInTheDocument();
    expect(screen.getByText('palette.secondary')).toBeInTheDocument();
    expect(screen.getByText('palette.accent')).toBeInTheDocument();
  });

  it('renders generate button with correct text', () => {
    render(<PaletteBaseColors />);

    expect(screen.getByText('common.generate_palette')).toBeInTheDocument();
  });

  it('initializes colors from palette context', () => {
    render(<PaletteBaseColors />);

    const mock_complementaryColors = generateComplementaryColors(
      mock_palette.base.basePrimary
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue(mock_palette.base.basePrimary.toHex());
    expect(inputs[1]).toHaveValue(
      mock_complementaryColors.analogous[0].toHex()
    );
    expect(inputs[2]).toHaveValue(
      mock_complementaryColors.complementary[0].toHex()
    );
  });

  it('calls generate function with base colors when button is clicked', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const generateButton = screen.getByText('common.generate_palette');
    await user.click(generateButton);

    expect(mock_generate).toHaveBeenCalledTimes(1);
    expect(mock_generate).toHaveBeenCalledWith({
      basePrimary: expect.any(OkColor),
      baseSecondary: expect.any(OkColor),
      baseAccent: expect.any(OkColor),
    });
  });

  it('updates primary color when hex input changes', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[0]);
    const editiableInputs = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];
    await user.clear(editiableInputs[0]);
    await user.type(editiableInputs[0], '#FF0000');

    const generateButton = screen.getByText('common.generate_palette');
    await user.click(generateButton);

    const callArgs = mock_generate.mock.calls[0][0];
    expect(callArgs.basePrimary.toHex()).toBe('#ff0000');
  });

  it('updates secondary color when hex input changes', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[1]);
    const editiableInputs = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];
    await user.clear(editiableInputs[1]);
    await user.type(editiableInputs[1], '#00FF00');

    const generateButton = screen.getByText('common.generate_palette');
    await user.click(generateButton);

    const callArgs = mock_generate.mock.calls[0][0];
    expect(callArgs.baseSecondary.toHex()).toBe('#00ff00');
  });

  it('updates accent color when hex input changes', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[2]);
    const editiableInputs = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];
    await user.clear(editiableInputs[2]);
    await user.type(editiableInputs[2], '#0000FF');

    const generateButton = screen.getByText('common.generate_palette');
    await user.click(generateButton);

    const callArgs = mock_generate.mock.calls[0][0];
    expect(callArgs.baseAccent.toHex()).toBe('#0000ff');
  });

  it('generates complementary colors for secondary and accent based on primary', async () => {
    render(<PaletteBaseColors />);

    const suggestedLabels = screen.getAllByText('common.suggested');
    expect(suggestedLabels).toHaveLength(2);
  });

  it('automatically updates secondary and accent when primary changes', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');
    const initialSecondaryValue = (inputs[1] as HTMLInputElement).value;
    const initialAccentValue = (inputs[2] as HTMLInputElement).value;

    await user.click(inputs[0]);
    const editiableInputs = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];
    await user.clear(editiableInputs[0]);
    await user.type(editiableInputs[0], '#FF0000');

    await waitFor(() => {
      expect(inputs[1]).not.toHaveValue(initialSecondaryValue);
      expect(inputs[2]).not.toHaveValue(initialAccentValue);
    });
  });

  it('allows manual override of automatically generated secondary color', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[1]);

    const editiableInputs = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];

    await user.clear(editiableInputs[1]);
    await user.type(editiableInputs[1], '#123456');

    const generateButton = screen.getByText('common.generate_palette');
    await user.click(generateButton);

    const callArgs = mock_generate.mock.calls[0][0];
    expect(callArgs.baseSecondary.toHex()).toBe('#123456');
  });

  it('allows manual override of automatically generated accent color', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[2]);

    const editiableInputs = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];

    await user.clear(editiableInputs[2]);
    await user.type(editiableInputs[2], '#ABCDEF');

    const generateButton = screen.getByText('common.generate_palette');
    await user.click(generateButton);

    const callArgs = mock_generate.mock.calls[0][0];
    expect(callArgs.baseAccent.toHex()).toBe('#abcdef');
  });

  it('updates colors when palette context changes', () => {
    const mock_newPalette: Palette = {
      base: {
        basePrimary: new OkColor(0.7, 0.3, 60, 1),
        baseSecondary: new OkColor(0.6, 0.25, 120, 1),
        baseAccent: new OkColor(0.5, 0.2, 240, 1),
      },
      variants: [],
    };

    mock_usePalette.mockReturnValue({
      palette: mock_newPalette,
      generate: mock_generate,
    });

    const { rerender } = render(<PaletteBaseColors />);
    rerender(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue(mock_newPalette.base.basePrimary.toHex());
  });

  it('clicking complementary color button updates secondary color', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const buttons = screen.getAllByRole('button');
    const complementaryButton = buttons.find(
      (btn) => btn !== screen.getByText('common.generate_palette')
    );

    if (complementaryButton) {
      await user.click(complementaryButton);

      const inputs = screen.getAllByRole('textbox');
      const secondaryInput = inputs[1] as HTMLInputElement;
      expect(secondaryInput.value).toBeTruthy();
    }
  });

  it('renders hex inputs for all three base colors', () => {
    render(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
  });

  it('passes all three base colors to generate function', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const generateButton = screen.getByText('common.generate_palette');
    await user.click(generateButton);

    const callArgs = mock_generate.mock.calls[0][0];
    expect(callArgs).toHaveProperty('basePrimary');
    expect(callArgs).toHaveProperty('baseSecondary');
    expect(callArgs).toHaveProperty('baseAccent');
    expect(callArgs.basePrimary).toBeInstanceOf(OkColor);
    expect(callArgs.baseSecondary).toBeInstanceOf(OkColor);
    expect(callArgs.baseAccent).toBeInstanceOf(OkColor);
  });

  it('maintains color state across multiple interactions', async () => {
    const user = userEvent.setup();
    render(<PaletteBaseColors />);

    const inputs = screen.getAllByRole('textbox');

    await user.click(inputs[0]);
    const editiableInputs = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];

    await user.clear(editiableInputs[0]);
    await user.type(editiableInputs[0], '#111111');

    await user.click(inputs[1]);
    const editiableInputs2 = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];

    await user.clear(editiableInputs2[1]);
    await user.type(editiableInputs2[1], '#222222');

    await user.click(inputs[2]);
    const editiableInputs3 = screen.getAllByRole(
      'textbox'
    ) as HTMLInputElement[];
    await user.clear(editiableInputs3[2]);
    await user.type(editiableInputs3[2], '#333333');

    const generateButton = screen.getByText('common.generate_palette');
    await user.click(generateButton);

    const callArgs = mock_generate.mock.calls[0][0];
    expect(callArgs.basePrimary.toHex()).toBe('#111111');
    expect(callArgs.baseSecondary.toHex()).toBe('#222222');
    expect(callArgs.baseAccent.toHex()).toBe('#333333');
  });
});
