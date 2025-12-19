import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    minify: "esbuild",
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: true,
    port: 5173,
  },

  plugins: [react(), tailwindcss()],
});
