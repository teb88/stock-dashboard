import {Brightness4} from '@mui/icons-material';
import {IconButton, useColorScheme} from '@mui/joy';

const ThemeToggle = () => {
  const {mode, setMode} = useColorScheme();
  return (
    <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      <Brightness4 />
    </IconButton>
  );
};

export default ThemeToggle;
