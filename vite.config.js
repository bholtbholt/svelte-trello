import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@stores': path.resolve(__dirname, './stores'),
      '@components': path.resolve(__dirname, './components'),
    },
  },
  plugins: [svelte({ preprocess: sveltePreprocess() })],
});
