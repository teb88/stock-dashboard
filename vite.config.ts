import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  base: process.env.VITE_BUILD_BASE || '/',
  plugins: [react()],
}));
