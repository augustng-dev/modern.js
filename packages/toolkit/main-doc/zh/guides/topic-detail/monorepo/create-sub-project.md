---
sidebar_position: 2
---

# 创建子项目

本章将要介绍如何在 Monorepo 工程下创建子项目。

> Modern.js 支持使用 pnpm 和 Yarn 的 Monorepo，这里以使用 pnpm 为例。以下命令可以以同样方式使用 Yarn 来执行。

Modern.js 针对 Monorepo 工程提供了生成器功能，它用于在 Monorepo 工程下创建不同类型的 Monorepo 子项目。在生成器中提供以下类型子项目的创建：

- 「应用」类型
- 「模块」类型

要启动 Monorepo 的生成器功能，可以在 Monorepo 工程根目录下执行命令：

```
pnpm run new
```

:::info 补充信息
使用 Yarn 的方式：`yarn new`
:::

执行成功后，可以看到如下内容：

```
? 请选择你想创建的工程类型 (Use arrow keys)
❯ 应用
  应用（测试）
  模块
  模块（内部）
```

:::info 注
「应用」与「应用（测试）」都是「应用」类型的项目，区别是「应用」类型的子项目会创建在 `./apps` 目录下，而 「应用（测试）」类型的子项目会创建在 `./examples` 目录下。
:::

:::info 注
「模块」与「模块（内部）」都是「模块」类型的项目，区别之一是「模块」类型的子项目会创建在 `./packages` 目录下，而「模块（内部）」类型的子项目会创建在 `./features` 目录下。

对于「模块」类型的子项目允许被发布到外部（例如 npm)，而对于「模块（内部）」的子项目则可以在应用项目中直接使用其源码（该特性是「模块」项目不具备的，应用项目对于「模块（内部）」子项目做了特殊处理），因此这类子项目不需要发布到外部。
:::

然后根据不同的需求选择对应的类型项目选项，选择之后便开始出现对应子项目类型的问题和选项。例如选择「应用」后会出现：

```
? 请选择你想创建的工程类型 应用
? 请填写子项目名称
```

当完成所有生成器问题之后，便开始进行项目的创建和项目依赖的下载。当创建成功之后，可以看到类似以下内容：

```
[INFO] 依赖自动安装成功
[INFO] 创建成功！
可在新项目的目录下运行以下命令：
pnpm run dev          # 按开发环境的要求，运行和调试项目
pnpm run build        # 按生产环境的要求，构建项目
pnpm run serve        # 按生产环境的要求，运行项目
pnpm run lint         # 检查和修复所有代码
pnpm run new          # 继续创建更多项目要素，比如应用入口
```