import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    // 输出目录（默认就是 dist，无需修改）
    outDir: 'dist',
    // 资源基础路径
    // Cloudflare Pages: 使用相对路径
    base: './',
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用资源内联（小于 4KB 的资源内联为 base64）
    assetsInlineLimit: 4096,
    // 生成 sourcemap（生产环境建议关闭以减小体积）
    sourcemap: false,
    // 分块策略
    rollupOptions: {
      output: {
        // 手动代码分割，优化加载性能
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
        }
      }
    }
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react']
  }
})
