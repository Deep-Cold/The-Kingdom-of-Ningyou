# 人偶之国 · 世界设定档案

静态设定展示网站。直接打开 `dist/index.html` 即可浏览，无需安装依赖。

## 网站文件

- `dist/index.html`：页面与设定内容
- `dist/styles.css`：响应式样式、图片比例与动效
- `dist/app.js`：导航与人物档案弹窗
- `dist/assets/`：设定图片

## GitHub Pages

上传仓库后，在仓库 Settings → Pages → Build and deployment 中选择 GitHub Actions。
推送至 `main` 分支后，Pages 工作流发布 `dist`。所有图片和脚本使用相对路径，支持项目子目录。

图片展示保留完整比例；移动端菜单支持外部点击和 Escape 关闭。
人物弹窗支持 Escape、关闭按钮与背景点击关闭，关闭后恢复阅读位置与键盘焦点。
系统开启减少动态效果时，页面关闭滚动动画与过渡。

内容与图片来自项目提供的设定资料。