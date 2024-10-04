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
        // proxy: {
        //     "/api": {
        //         target: "https://kdt.frontend.5th.programmers.co.kr:5009", // 실제 API 서버 주소
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, ""), // 경로 재작성
        //     },
        // },
    },
});
