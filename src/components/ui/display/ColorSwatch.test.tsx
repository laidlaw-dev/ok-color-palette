import { render } from '@testing-library/react';
import { ColorSwatch } from './ColorSwatch';
import { OkColor } from '@/lib/color';

describe('ColorSwatch', () => {
  const mock_color = new OkColor(0.5, 0.2, 120, 1);

  it('should render a div element', () => {
    const { container } = render(<ColorSwatch color={mock_color} />);
    const swatch = container.firstChild;
    expect(swatch).toBeInTheDocument();
    expect(swatch?.nodeName).toBe('DIV');
  });

  it('should apply the color as background', () => {
    const { container } = render(<ColorSwatch color={mock_color} />);
    const swatch = container.firstChild as HTMLElement;
    const hex = mock_color.toHex();
    // Browser converts hex to RGB format in style property
    expect(swatch).toHaveStyle({ backgroundColor: hex });
  });

  it('should apply default size classes when no size provided', () => {
    const { container } = render(<ColorSwatch color={mock_color} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('h-8');
    expect(swatch.className).toContain('w-8');
  });

  it('should apply default border and rounded classes', () => {
    const { container } = render(<ColorSwatch color={mock_color} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('border');
    expect(swatch.className).toContain('rounded');
    expect(swatch.className).toContain('border-border-surface');
  });

  it('should apply transition classes', () => {
    const { container } = render(<ColorSwatch color={mock_color} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('transition-background');
    expect(swatch.className).toContain('duration-250');
    expect(swatch.className).toContain('ease-in-out');
  });

  it('should override height when custom h- class is provided', () => {
    const { container } = render(
      <ColorSwatch color={mock_color} className="h-12" />
    );
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).not.toContain('h-8');
    expect(swatch.className).toContain('h-12');
    expect(swatch.className).toContain('w-8');
  });

  it('should override width when custom w- class is provided', () => {
    const { container } = render(
      <ColorSwatch color={mock_color} className="w-16" />
    );
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('h-8');
    expect(swatch.className).not.toContain('w-8');
    expect(swatch.className).toContain('w-16');
  });

  it('should override both dimensions when custom h- and w- classes are provided', () => {
    const { container } = render(
      <ColorSwatch color={mock_color} className="h-12 w-16" />
    );
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).not.toContain('h-8');
    expect(swatch.className).not.toContain('w-8');
    expect(swatch.className).toContain('h-12');
    expect(swatch.className).toContain('w-16');
  });

  it('should apply additional custom classes without size overrides', () => {
    const { container } = render(
      <ColorSwatch color={mock_color} className="shadow-lg hover:scale-105" />
    );
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('h-8');
    expect(swatch.className).toContain('w-8');
    expect(swatch.className).toContain('shadow-lg');
    expect(swatch.className).toContain('hover:scale-105');
  });

  it('should handle empty className', () => {
    const { container } = render(
      <ColorSwatch color={mock_color} className="" />
    );
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('h-8');
    expect(swatch.className).toContain('w-8');
  });

  it('should handle undefined className', () => {
    const { container } = render(<ColorSwatch color={mock_color} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('h-8');
    expect(swatch.className).toContain('w-8');
  });

  it('should render with different colors', () => {
    const mock_red = new OkColor(0.6, 0.25, 20, 1);
    const mock_blue = new OkColor(0.5, 0.2, 240, 1);

    const { container: container1 } = render(<ColorSwatch color={mock_red} />);
    const { container: container2 } = render(<ColorSwatch color={mock_blue} />);

    const swatch1 = container1.firstChild as HTMLElement;
    const swatch2 = container2.firstChild as HTMLElement;

    expect(swatch1).toHaveStyle({ backgroundColor: mock_red.toHex() });
    expect(swatch2).toHaveStyle({ backgroundColor: mock_blue.toHex() });
    expect(swatch1.style.backgroundColor).not.toBe(
      swatch2.style.backgroundColor
    );
  });

  it('should handle colors with transparency', () => {
    const mock_transparent = new OkColor(0.5, 0.2, 120, 0.5);
    const { container } = render(<ColorSwatch color={mock_transparent} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch).toHaveStyle({ backgroundColor: mock_transparent.toHex() });
  });

  it('should handle very dark colors', () => {
    const mock_dark = new OkColor(0.1, 0.05, 0, 1);
    const { container } = render(<ColorSwatch color={mock_dark} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch).toHaveStyle({ backgroundColor: mock_dark.toHex() });
  });

  it('should handle very light colors', () => {
    const mock_light = new OkColor(0.95, 0.05, 0, 1);
    const { container } = render(<ColorSwatch color={mock_light} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch).toHaveStyle({ backgroundColor: mock_light.toHex() });
  });

  it('should handle achromatic colors', () => {
    const mock_gray = new OkColor(0.5, 0, 0, 1);
    const { container } = render(<ColorSwatch color={mock_gray} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch).toHaveStyle({ backgroundColor: mock_gray.toHex() });
  });

  it('should handle null color with radial gradient', () => {
    const { container } = render(<ColorSwatch color={null} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch).toHaveStyle({
      background: 'radial-gradient(circle at 50%, #000000 0%, #FFFFFF 100%)',
      opacity: '0.5',
    });
  });

  it('should handle undefined color with radial gradient', () => {
    const { container } = render(<ColorSwatch />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch).toHaveStyle({
      background: 'radial-gradient(circle at 50%, #000000 0%, #FFFFFF 100%)',
      opacity: '0.5',
    });
  });

  it('should apply default size classes when color is null', () => {
    const { container } = render(<ColorSwatch color={null} />);
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('h-8');
    expect(swatch.className).toContain('w-8');
  });

  it('should apply custom classes when color is null', () => {
    const { container } = render(
      <ColorSwatch color={null} className="h-12 w-16" />
    );
    const swatch = container.firstChild as HTMLElement;
    expect(swatch.className).toContain('h-12');
    expect(swatch.className).toContain('w-16');
    expect(swatch.className).not.toContain('h-8');
    expect(swatch.className).not.toContain('w-8');
  });
});
