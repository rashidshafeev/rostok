import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import path from "path";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    // tsconfigPaths()
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      // '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      // '@store': fileURLToPath(new URL('./src/redux', import.meta.url)),
      // '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
'@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@types': path.resolve(__dirname, 'src/types'),
    },
  },
  server: {
    port: 5175,
  },
});
