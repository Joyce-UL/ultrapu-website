# UltraPU 网站部署指南

## 快速部署步骤

### 第一步：安装 Node.js 和 Vercel CLI

如果你还没有安装，需要先安装：

1. **安装 Node.js**：访问 https://nodejs.org/ 下载并安装 LTS 版本

2. **安装 Vercel CLI**：
   ```bash
   npm install -g vercel
   ```

### 第二步：登录 Vercel

```bash
vercel login
```

按提示使用邮箱或 GitHub 账号登录。

### 第三步：进入项目目录并部署

```bash
cd "D:\workbuddy task\WorkBuddy"
vercel
```

第一次部署时会询问几个问题：
- **Set up and deploy "..."?** → 输入 `Y`
- **Which scope do you want to deploy to?** → 选择你的账号
- **Link to existing project?** → 输入 `N`（创建新项目）
- **What's your project name?** → 可以输入 `ultrapu-website` 或按回车使用默认
- **In which directory is your code located?** → 按回车使用当前目录 `./`

### 第四步：完成部署

部署完成后，你会看到类似这样的输出：
```
🔍  Inspect: https://vercel.com/xxx/ultrapu-website/xxx [1s]
✅  Production: https://ultrapu-website-xxx.vercel.app [copied to clipboard]
```

访问 `https://ultrapu-website-xxx.vercel.app` 即可看到你的网站！

---

## 后续更新

代码有更新后，重新运行：

```bash
cd "D:\workbuddy task\WorkBuddy"
vercel --prod
```

或者简写：
```bash
npm run deploy
```

---

## 常见问题

### 1. 端口被占用
如果本地开发服务器端口被占用，Vite 会自动使用下一个可用端口（5174、5175 等）。

### 2. 路由刷新 404
项目已配置 `vercel.json`，确保 React Router 的客户端路由能正常工作。

### 3. 自定义域名
在 Vercel 控制台（https://vercel.com/dashboard）找到你的项目：
- 进入 Settings → Domains
- 添加你的域名 `www.ultrapu.com`
- 按提示配置 DNS

---

## 项目文件说明

- `src/` - 源代码目录
  - `components/` - 可复用组件
  - `pages/` - 页面组件
  - `contexts/` - React Context
  - `translations/` - 多语言文件
- `dist/` - 构建输出目录（自动生成）
- `vercel.json` - Vercel 部署配置
- `package.json` - 项目依赖和脚本

---

## 需要帮助？

- Vercel 文档：https://vercel.com/docs
- 项目问题请联系开发团队
