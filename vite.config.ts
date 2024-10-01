import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    //@ts-ignore
    tailwindcss(),
  ],
  server: {
    port: 8080, // 서버 포트를 8080으로 설정
    strictPort: true,
    proxy: {
      "/posts": {
        target: "https://kdt.frontend.5th.programmers.co.kr:5009", // 요청할 서버
        changeOrigin: true, // 호스트 헤더를 대상 URL로 변경
        secure: false, // HTTPS의 경우, SSL 인증서를 무시
        rewrite: (path) => path.replace(/^\/posts/, ""), // 경로 재작성 (필요한 경우)
      },
    },
  },
});
