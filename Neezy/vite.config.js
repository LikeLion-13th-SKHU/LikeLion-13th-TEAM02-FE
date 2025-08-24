import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://junyeong.store",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api 제거하여 백엔드 실제 경로와 매칭
      },
    },
  },
});
