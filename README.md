# Buddy Chinese

一个独立的中文终端版 Buddy 应用，基于原始 Claude Code 的 buddy 模块创建。

## 功能特性

- 🐣 孵化独特的 Buddy
- 🎨 显示 Buddy 的 ASCII 艺术形象（根据稀有度着色）
- 🌈 稀有度颜色：普通(灰色)、精良(绿色)、稀有(蓝色)、史诗(紫色)、传说(金色)
- 🏅 稀有度徽章：🐛普通 🌿精良 💎稀有 🔮史诗 👑传说
- ✨ Shiny 彩虹效果
- 📊 赛博朋克风格统计条
- 🎬 动画展示 Buddy
- 🔮 保底机制（连续普通增加稀有度概率）
- 🎲 随机预览（不保存）
- ⚙️ 配置管理

## 安装

```bash
cd buddy-cn
npm install
```

## 使用方法

### 安装全局命令

```bash
npm run build && npm link
```

### 孵化新的 Buddy

```bash
npm run start -- hatch
```

或使用全局命令：

```bash
buddy-cn hatch
```

可以使用 `--seed` 参数指定种子以获得相同的 Buddy：

```bash
npm run start -- hatch --seed myseed123
```

或：

```bash
buddy-cn hatch --seed myseed123
```

### 显示当前的 Buddy

```bash
npm run start -- show
```

或使用全局命令：

```bash
buddy show
```

### 随机预览 Buddy

```bash
npm run start -- random
```

或使用全局命令：

```bash
buddy random
```

可以指定种子：

```bash
buddy random --seed myseed
```

### 放生 Buddy

```bash
npm run start -- abandon
```

或使用全局命令：

```bash
buddy abandon
```

### 列出所有可用的物种

```bash
npm run start -- list
```

或使用全局命令：

```bash
buddy-cn list
```

### 展示 Buddy 的动画

```bash
npm run start -- animate
```

或使用全局命令：

```bash
buddy-cn animate
```

可以使用 `--fps` 参数指定动画帧率：

```bash
npm run start -- animate --fps 15
```

或：

```bash
buddy-cn animate --fps 15
```

### 配置管理

显示当前配置：

```bash
npm run start -- config --show
```

或使用全局命令：

```bash
buddy-cn config --show
```

设置配置项：

```bash
npm run start -- config --set userId=myuser
```

或：

```bash
buddy-cn config --set userId=myuser
```

## 构建应用

```bash
npm run build
```

构建后的文件将在 `dist` 目录中。

## 配置文件

配置文件存储在用户主目录下的 `.buddy-chinese.json` 文件中。

## 项目结构

```
buddy-chinese/
├── src/
│   ├── index.ts          # 主入口文件
│   ├── types.ts          # 类型定义
│   ├── companion.ts      # Buddy 核心逻辑
│   ├── sprites.ts        # ASCII 艺术渲染
│   └── config.ts         # 配置管理
├── package.json
├── tsconfig.json
└── README.md
```

## 许可证

MIT
