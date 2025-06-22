// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // 本地：8081 用户模块
      '/api-user': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-user/, ''),
      },
      // 本地：8083 交通模块
      '/api-traffic': {
        target: 'http://localhost:8083',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-traffic/, ''),
      },
      // ✅ 保留：8087 本地信号灯模块
      '/api-signal': {
        target: 'http://localhost:8087',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-signal/, ''),
      },
      // ✅ 新增：远程信号灯测试模块（用于 POST 到 10.241.43.177）
      '/api-remote-signal': {
        target: 'http://10.241.43.177:8082',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-remote-signal/, ''),
      },
    },
  },
})
