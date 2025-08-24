import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // 커스텀 도메인 기준으로 기본 경로 설정 (루트 경로)
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
    // 아래 옵션들은 필요에 따라 추가
    // host: true, // 외부 접근 가능하게 할 때
    // port: 5173, // 원하는 포트 설정
  },
});
