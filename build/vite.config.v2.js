import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [vue2()],
  build: {
    outDir: resolve(__dirname, '../dist/v2'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, '../src/wrapper.js'),
      name: 'DropdownDatepicker',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'dropdown-datepicker.esm.js';
        if (format === 'iife') return 'dropdown-datepicker.iife.js';
        return 'dropdown-datepicker.cjs';
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' }, exports: 'named' },
    },
  },
});
