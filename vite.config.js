import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'postcss'
  },
  base: '/p10_mockup_learn-at-home/'
})
