import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint';
import path from 'path'; // <--- Import path
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),eslint()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // <--- Add this alias configuration
      // You might have other aliases here too
    },
  },
})


