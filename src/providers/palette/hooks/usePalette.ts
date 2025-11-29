import { useContext } from 'react';
import { PaletteContext } from '../PaletteContext';

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('No PaletteContext set, use PaletteProvider to set one');
  }
  return context;
};
