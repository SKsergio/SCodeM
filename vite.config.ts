import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para imports
    },
  },
  server: {
    port: 3000, // Puerto de desarrollo
    open: true, // Abre el navegador automáticamente
  },
});