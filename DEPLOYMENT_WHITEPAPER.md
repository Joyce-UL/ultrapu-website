# 网站部署需求技术白皮书

> **项目名称**：UltraPU 官网  
> **文档版本**：v1.0  
> **生成时间**：2026-04-17  
> **目标受众**：云服务方案规划 LLM / DevOps 工程师

---

## 一、技术概览

### 1.1 运行环境要求

| 项目 | 要求 | 说明 |
|------|------|------|
| **Node.js** | ≥18.x（推荐 20.x LTS） | 仅用于本地构建，部署后无需 Node.js 运行时 |
| **npm** | ≥9.x | 包管理器 |
| **构建环境** | Unix/Linux/macOS/Windows | 无特殊要求 |

> ⚠️ **重要**：生产环境仅需静态文件服务器，无需 Node.js 运行时。

### 1.2 构建工具链

| 工具 | 版本 | 用途 |
|------|------|------|
| **Vite** | 5.x | 构建工具 / 开发服务器 |
| **@vitejs/plugin-react** | 4.x | React 插件 |

### 1.3 前端技术栈

```
核心框架:
├── react@18.2          # UI 框架
├── react-dom@18.2      # DOM 渲染
└── react-router-dom@6  # 客户端路由

样式与 UI:
├── tailwindcss@3.4      # CSS 框架
├── autoprefixer         # CSS 前缀自动补全
├── postcss              # CSS 处理
└── lucide-react@0.344  # 图标库

动画与交互:
├── framer-motion@11    # 动画库
└── react-intersection-observer # 滚动触发动画

第三方服务:
└── firebase@12.12       # 实时数据库 / 认证 / 存储
```

---

## 二、构建产物描述

### 2.1 构建命令

```bash
npm run build    # 生产构建 → 输出到 dist/
npm run preview  # 本地预览构建产物
npm run dev      # 开发服务器（端口 5173）
```

### 2.2 构建输出结构

```
dist/
├── index.html              # 主入口（5.62 KB）
└── assets/
    ├── index-*.css         # 样式文件（46.80 KB gzip: 8.13 KB）
    └── index-*.js          # 主 JS 包（881.93 KB gzip: 231.20 KB）

总计: 7 个文件，约 927 KB（未压缩）
```

### 2.3 应用类型

| 属性 | 值 | 说明 |
|------|------|------|
| **渲染模式** | SPA（单页应用） | React Router 客户端路由 |
| **SSR** | ❌ 无 | 纯客户端渲染 |
| **静态资源** | ✅ 是 | 构建后为纯静态文件 |
| **后端依赖** | ⚠️ 可选 | Firebase（可迁移） |

> 📦 **部署包性质**：纯静态资源包，可部署至任何静态托管服务。

---

## 三、资源消耗预估

### 3.1 存储需求

| 项目 | 大小 | 说明 |
|------|------|------|
| **构建产物** | ~1 MB | 压缩后约 927 KB |
| **源代码** | ~5-10 MB | 含 node_modules（不部署） |
| **生产存储** | **1-2 MB** | 极低存储需求 |

### 3.2 带宽预估

| 场景 | 估算 | 计算依据 |
|------|------|---------|
| **首次访问（未缓存）** | ~900 KB | 3 个资源文件 |
| **重复访问（已缓存）** | ~50-100 KB | 仅 JS delta + 资源更新 |
| **月流量（1000 UV）** | ~1-3 GB | 假设每人访问 5-10 次 |
| **月流量（10000 UV）** | ~10-30 GB | 常规 B2B 网站规模 |
| **建议带宽配置** | **100 GB/月** | 预留冗余，应对突发 |

### 3.3 性能指标

| 指标 | 目标值 | 说明 |
|------|--------|------|
| **首屏加载（FCP）** | < 1.5s | gzip 后约 240 KB |
| **LCP** | < 2.5s | 含首屏图片 |
| **TTI** | < 3s | 可交互时间 |
| **CLS** | < 0.1 | 布局偏移 |

---

## 四、关键功能点

### 4.1 环境变量配置

**必须配置的环境变量**（`.env.local`）：

```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

> ⚠️ **前缀要求**：所有变量必须以 `VITE_` 开头，否则无法在客户端访问。

### 4.2 Firebase 服务（可选迁移）

| 服务 | 当前状态 | 迁移难度 |
|------|---------|---------|
| **Firestore** | ✅ 已集成 | 中等 |
| **Authentication** | ✅ 已集成（后台） | 中等 |
| **Storage** | ✅ 已配置 | 中等 |

**可迁移目标**：
- Supabase（PostgreSQL + Auth + Storage）
- 阿里云表格存储 / MongoDB
- 自建 Node.js API

### 4.3 表单提交处理

| 表单 | 当前状态 | 处理方式 |
|------|---------|---------|
| **联系表单** | ⚠️ 仅模拟 | 需接入第三方服务 |
| **询盘提交** | ⚠️ 仅模拟 | 需接入 Firebase 或第三方 |

**推荐方案**：

| 方案 | 免费额度 | 优点 | 缺点 |
|------|---------|------|------|
| **Formspree** | 50 submissions/月 | 简单、无后端 | 欧洲合规需付费版 |
| **Netlify Forms** | 无限（Netlify部署） | 免费、内置 | 需用 Netlify 部署 |
| **EmailJS** | 200 emails/月 | 简单、客户端直发 | 免费版有限制 |
| **邮件服务器 API** | 自建 | 完全可控 | 需维护邮件服务 |

### 4.4 多语言支持

| 项目 | 状态 | 说明 |
|------|------|------|
| **语言数量** | ✅ 11 种 | en/zh/ko/ja/vi/id/ar/fr/de/es/ru |
| **RTL 支持** | ✅ 是 | 阿拉伯语 |
| **实现方式** | React Context | 客户端切换，无页面刷新 |
| **SEO** | ⚠️ 部分 | hreflang 已配置，但 SPA 需预渲染或 SSR 才能完全 SEO 友好 |

---

## 五、目标市场约束

### 5.1 GDPR 合规要求

> 🎯 **核心目标**：主要服务欧洲客户，必须符合 GDPR（欧盟通用数据保护条例）。

#### 5.1.1 隐私政策页面

必须包含的要素：
- [ ] 数据收集声明
- [ ] Cookie 使用说明
- [ ] 用户权利说明（访问、更正、删除权）
- [ ] 数据保留期限
- [ ] 联系方式（DPO 指定）

#### 5.1.2 Cookie 合规

| 类型 | 要求 | 当前状态 |
|------|------|---------|
| **必要 Cookie** | 无需同意 | ✅ 无 |
| **分析 Cookie** | 需同意 | ⚠️ Google Analytics 4（需配置同意模式） |
| **营销 Cookie** | 需明确同意 | ❌ 无 |

**建议实现**：
```javascript
// 延迟加载 GA，直到用户同意
window.gtag('consent', 'default', {
  'analytics_storage': 'denied'
});
// 用户同意后
window.gtag('consent', 'update', {
  'analytics_storage': 'granted'
});
```

#### 5.1.3 数据传输

| 场景 | 合规要求 |
|------|---------|
| **欧洲用户数据存储** | 需在欧盟境内服务器或符合 SCC |
| **Firebase 数据中心** | 选择 `europe-west` 或支持 GDPR 的区域 |
| **Google Analytics** | 配置 IP 匿名化 + 数据处理协议 |

#### 5.1.4 联系表单数据处理

| 要求 | 说明 |
|------|------|
| **明确收集目的** | 说明为何收集、如何使用 |
| **最小化原则** | 仅收集必要信息 |
| **数据保留** | 设定保留期限 |
| **撤回同意** | 用户可要求删除 |

### 5.2 性能约束（欧洲用户体验）

| 地区 | 延迟目标 | CDN 建议 |
|------|---------|---------|
| **西欧（德/法/英）** | < 100ms | AWS CloudFront / Cloudflare |
| **东欧** | < 150ms | 多节点 CDN |
| **地中海** | < 150ms | 边缘节点 |

**推荐 CDN 配置**：
```
CDN 区域优先级:
1. 欧洲（法兰克福/阿姆斯特丹/伦敦）
2. 北美（备用）
3. 亚太（可选）
```

---

## 六、部署方案建议

### 6.1 方案对比

| 方案 | 月费用 | 欧洲速度 | CDN | 推荐指数 |
|------|--------|---------|-----|---------|
| **Vercel** | 0元 | 快 | 内置 | ⭐⭐⭐⭐⭐ |
| **Netlify** | 0元 | 快 | 内置 | ⭐⭐⭐⭐ |
| **Cloudflare Pages** | 0元 | **极快** | 内置 | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | 0元 | 一般 | 需额外配置 | ⭐⭐⭐ |
| **阿里云 OSS + CDN** | 10-30元 | 一般 | 需配置 | ⭐⭐⭐ |
| **阿里云 ECS** | 30-80元 | 一般 | 自建 Nginx | ⭐⭐ |

### 6.2 推荐方案

#### 方案 A：最佳性价比（推荐欧洲市场）

```
Cloudflare Pages（免费）
├── 无限带宽
├── 全球 CDN（欧洲节点优秀）
├── 自动 HTTPS
└── GitHub 联动部署

Formspree（免费版）
└── 联系表单处理
```

#### 方案 B：完全自主可控

```
阿里云 OSS + Cloudflare CDN
├── OSS 存储（~10元/月）
├── Cloudflare 免费 CDN
├── 自定义域名 + SSL
└── 第三方表单服务
```

### 6.3 部署检查清单

```
部署前:
□ 执行 npm run build 生成 dist/
□ 配置所有环境变量
□ 测试 Firebase 连接
□ 验证表单提交功能
□ GDPR 合规检查

部署中:
□ 上传 dist/ 到托管服务
□ 配置自定义域名
□ 启用 HTTPS
□ 配置 CDN 缓存策略
□ 设置 11 种语言的 hreflang

部署后:
□ 验证所有页面可访问
□ 测试表单提交
□ 验证多语言切换
□ 检查 GA 事件触发
□ GDPR 隐私政策页面上线
```

---

## 七、环境变量配置参考

### 7.1 Vercel 环境变量

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

### 7.2 Netlify 环境变量

在 Site Settings → Environment Variables 中添加：
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### 7.3 阿里云 OSS 配置

```javascript
// vite.config.js 修改 output 配置
export default defineConfig({
  base: './',  // 确保资源路径正确
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
```

---

## 八、附录

### 8.1 项目源码位置

```
本地: D:\web\ultrapu-website\
GitHub: https://github.com/Joyce-UL/ultrapu-website
```

### 8.2 关键文件索引

| 文件 | 说明 |
|------|------|
| `vite.config.js` | 构建配置 |
| `tailwind.config.js` | 样式主题 |
| `index.html` | SEO 元数据 |
| `src/App.jsx` | 路由配置 |
| `src/firebase/config.js` | Firebase 配置 |
| `src/contexts/LanguageContext.jsx` | 多语言实现 |
| `src/pages/Contact.jsx` | 联系表单 |
| `dist/` | 构建产物（部署用） |

### 8.3 联系信息

| 项目 | 内容 |
|------|------|
| **公司** | Dongguan Ultra Leather New Material CO.,LTD |
| **网站** | https://www.ultrapu.com |
| **后台** | https://www.ultrapu.com/admin |
| **管理员邮箱** | glove@ultrapu.com |

---

> **文档说明**：本白皮书由 AI 基于源码分析生成，供云服务方案规划和 LLM 参考使用。具体部署时请根据实际需求调整配置。
