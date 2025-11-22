import { createContext } from 'react';
import type { UsePalette } from './hooks/usePaletteStore';

export const PaletteContext = createContext<UsePalette | null>(null);
