# Buddy Chinese

一个独立的中文终端版 Buddy 应用，基于原始 Claude Code 的 buddy 模块创建。

## 功能特性

- 🐣 孵化独特的 Buddy
- 🎨 显示 Buddy 的 ASCII 艺术形象
- 📊 查看 Buddy 的统计信息
- 🎬 动画展示 Buddy
- ⚙️ 配置管理

## 安装

```bash
cd buddy-chinese
npm install
```

## 使用方法

### 孵化新的 Buddy

```bash
npm run start -- hatch
```

可以使用 `--seed` 参数指定种子以获得相同的 Buddy：

```bash
npm run start -- hatch --seed myseed123
```

### 显示当前的 Buddy

```bash
npm run start -- show
```

### 列出所有可用的物种

```bash
npm run start -- list
```

### 展示 Buddy 的动画

```bash
npm run start -- animate
```

可以使用 `--fps` 参数指定动画帧率：

```bash
npm run start -- animate --fps 15
```

### 配置管理

显示当前配置：

```bash
npm run start -- config --show
```

设置配置项：

```bash
npm run start -- config --set userId=myuser
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
