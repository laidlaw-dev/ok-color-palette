import { PaletteDisplay } from './PaletteDisplay';
import { PaletteProvider } from './providers/palette';

const App = () => {
  return (
    <PaletteProvider>
      <PaletteDisplay />
    </PaletteProvider>
  );
};

export default App;
