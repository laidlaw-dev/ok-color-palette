import type { ReactNode } from 'react';
import { PaletteContext } from './PaletteContext';
import { usePaletteStore } from './hooks/usePaletteStore';

interface PaletteProviderProps {
  children: ReactNode;
}

export const PaletteProvider = ({ children }: PaletteProviderProps) => {
  const store = usePaletteStore();
  return (
    <PaletteContext.Provider value={store}>{children}</PaletteContext.Provider>
  );
};
