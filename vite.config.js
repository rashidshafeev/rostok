import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    // tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/redux', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/redux/api', import.meta.url)),
      '@customTypes': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/helpers', import.meta.url))
    },
  },
  server: {
    port: 5175,
  },
});
