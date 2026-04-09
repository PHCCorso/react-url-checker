import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This maps the @shared import to the actual physical folder
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  }
})
