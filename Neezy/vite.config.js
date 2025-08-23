import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://junyeong.store",
        changeOrigin: true,
        // rewrite 필요없으면 빼세요
        // rewrite: (path) => path.replace(/^\/api/, ""),
        secure: true, // 운영 환경에 따라 false로 조정 가능
      },
      "/login/oauth2": {
        target: "https://junyeong.store",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
