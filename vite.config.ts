import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  // 아래 css.postcss가 있을 경우 꼭 tailwind 포함
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
