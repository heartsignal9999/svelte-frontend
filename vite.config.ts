import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { PluginOption } from 'vite';

// 사용자 정의 미들웨어 정의
const customMiddleware = (): PluginOption => {
  return {
    name: 'custom-middleware',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // .css 파일에 대한 요청은 무시합니다.
        if (req.originalUrl.endsWith(".css")) {
          return next();
        }

        // 나머지 요청에 대한 사용자 정의 처리 로직
        // 예를 들어, 특정 경로로 리디렉션하는 로직을 추가할 수 있습니다.
        // 여기서는 단순히 next()를 호출하여 요청을 계속 진행하도록 합니다.
        next();
      });
    },
  };
};

// Vite 설정
export default defineConfig({
  plugins: [svelte(), customMiddleware()],
  // publicDir 설정 추가
  publicDir: '../public',
});
