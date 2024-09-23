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
    port: 8080,  // 서버 포트를 8080으로 설정
    strictPort: true,
  },
});
