import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 실제 백엔드 서버 주소:포트 입력
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
