import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/login/oauth2": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      // 필요한 다른 경로도 추가 가능
    },
  },
});
