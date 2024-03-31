import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';

function getBasePath(mode?: string) {
  if (process.env.BUILD_BASE) {
    return process.env.BUILD_BASE;
  } else if (mode) {
    return mode === 'production' ? '/stock-dashboard' : '/';
  } else {
    return '';
  }
}

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  base: getBasePath(mode),
  plugins: [react()],
}));
