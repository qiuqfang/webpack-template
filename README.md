# webpack-template

# 前言

该项目为以webpack搭建的多页面前端项目。

# 项目介绍

`webpack-template`是一个通过webpack、webpack-dev-server等搭建的前端脚手架项目，html-webpack-plugin、mini-css-extract-plugin、html-minimizer-webpack-plugin、css-minimizer-webpack-plugin、terser-webpack-plugin、compression-webpack-plugin插件的配置、提取与分离代码功能配置，开箱即用。

# 目录结构

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```sh

├── src                              # 源代码
│   ├── assets                       # 主题 字体等静态资源
│   ├── pages                        # 所有页面
│   ├── styles                       # 通用样式
│   ├── main.js                      # 通用js
├── .browserslistrc                  # CSS兼容配置
├── .eslintignore                    # ESLint忽略配置
├── .eslintrc.js                     # ESLint配置
├── .prettierignore                  # Prettier忽略配置
├── .prettierrc.js                   # Prettier配置
├── babel.config.json                # JS兼容配置
├── package.json                     # package.json
├── postcss.config.js                # 用基于JavaScript的插件来自动执行常规CSS操作配置
├── webpack.common.js                # webpack通用环境配置
├── webpack.dev.js                   # webpack开发环境配置
└── webpack.prod.js                  # webpack生产环境配置
```

# 安装

```sh
# 克隆项目

git clone https://github.com/qiuqfang/webpack-template.git

# 进入项目目录

cd webpack-template

# 安装依赖

yarn

# 本地开发 启动项目

yarn serve

```