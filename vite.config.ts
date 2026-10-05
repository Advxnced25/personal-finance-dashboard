import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /personal-finance-dashboard/.
  // GITHUB_ACTIONS is set only on GitHub's build servers, so local dev keeps using '/'.
  base: process.env.GITHUB_ACTIONS ? '/personal-finance-dashboard/' : '/',
})
