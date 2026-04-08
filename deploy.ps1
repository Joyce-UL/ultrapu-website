# 部署脚本 - 一键部署到 Vercel
# 使用方法: 右键点击此文件，选择 "使用 PowerShell 运行"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  UltraPU 网站部署工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Node.js
Write-Host "检查 Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ Node.js 未安装" -ForegroundColor Red
    Write-Host "请访问 https://nodejs.org/ 下载并安装 LTS 版本" -ForegroundColor Red
    Write-Host "安装完成后重新运行此脚本" -ForegroundColor Red
    Read-Host "按回车键退出"
    exit 1
}
Write-Host "✓ Node.js 版本: $nodeVersion" -ForegroundColor Green

# 检查 Vercel CLI
Write-Host ""
Write-Host "检查 Vercel CLI..." -ForegroundColor Yellow
$vercelVersion = vercel --version 2>$null
if (-not $vercelVersion) {
    Write-Host "Vercel CLI 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Vercel CLI 安装失败" -ForegroundColor Red
        Read-Host "按回车键退出"
        exit 1
    }
}
$vercelVersion = vercel --version 2>$null
Write-Host "✓ Vercel CLI 版本: $vercelVersion" -ForegroundColor Green

# 检查登录状态
Write-Host ""
Write-Host "检查 Vercel 登录状态..." -ForegroundColor Yellow
$loginCheck = vercel whoami 2>&1
if ($loginCheck -match "Error") {
    Write-Host "需要登录 Vercel..." -ForegroundColor Yellow
    vercel login
}
Write-Host "✓ 已登录 Vercel" -ForegroundColor Green

# 进入项目目录
$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath
Write-Host ""
Write-Host "项目路径: $projectPath" -ForegroundColor Cyan

# 部署
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "开始部署..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "提示: 首次部署会询问几个问题，按提示回答即可" -ForegroundColor Yellow
Write-Host "      后续更新直接按回车使用默认配置" -ForegroundColor Yellow
Write-Host ""

vercel --prod

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 部署成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "你的网站已上线！访问上面的链接查看。" -ForegroundColor Green
} else {
    Write-Host "❌ 部署失败" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "请检查错误信息，或尝试手动部署:" -ForegroundColor Yellow
    Write-Host "  1. 打开命令提示符 (CMD)" -ForegroundColor Yellow
    Write-Host "  2. cd `"$projectPath`"" -ForegroundColor Yellow
    Write-Host "  3. vercel --prod" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "按回车键退出"
