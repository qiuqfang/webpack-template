const glob = require("glob");
const path = require("path");
const chalk = require("chalk");

const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin"); // 进度条

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 配置html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css文件提取出来
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin"); // css摇树，只打包实际用到的代码

const HtmlMinimizerWebpackPlugin = require("html-minimizer-webpack-plugin"); // 优化压缩html文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); // 优化压缩css文件

const ESLintWebpackPlugin = require("eslint-webpack-plugin"); // 用于报告不符合规范的代码

const appPath = "";

const getStyleLoaders = (loader) => {
  return [
    // "style-loader",
    MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
    loader,
  ].filter(Boolean);
};

module.exports = {
  entry: {
    page1: {
      import: path.resolve(appPath, "src/pages/page1/index.js"),
    },
    page2: {
      import: path.resolve(appPath, "src/pages/page2/index.js"),
    },
  },
  output: {
    path: path.resolve(appPath, "dist"),
    filename: "js/[name].js",
    // webpack5.20+ 功能:CleanWebpackPlugin
    clean: true,
  },
  module: {
    rules: [
      {
        // 当前文件匹配了规则后，则不在继续往下匹配
        oneOf: [
          // 解析html文件
          {
            test: /\.(html|htm)$/i,
            use: ["html-loader"],
          },
          // 解析css文件
          {
            test: /\.css$/i,
            use: getStyleLoaders(),
          },
          // 解析s[ac]ss文件
          {
            test: /\.s[ac]ss$/i,
            use: getStyleLoaders("sass-loader"),
          },
          // 解析less文件
          {
            test: /\.less$/i,
            use: getStyleLoaders("less-loader"),
          },
          // 解析stylus文件
          {
            test: /\.styl$/i,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|lib)/,
            use: ["babel-loader"],
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(appPath, "src"),
      vue$: "vue/dist/vue.min.js",
    },
    extensions: [".js", ".json", ".wasm"],
    modules: ["node_modules"],
    symlinks: false, // 减少 npm link 或 yarn link 解析工作量
  },
  optimization: {
    minimize: true, // 最小化bundle
    minimizer: [new HtmlMinimizerWebpackPlugin(), new CssMinimizerWebpackPlugin()],
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/](vue)[\\/]/,
          name: "vue",
          priority: 0,
          reuseExistingChunk: true,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: "single", // 值single将创建一个运行时文件，用于共享所有生成的块。值multiple向每个入口点创建一个运行时文件
  },
  plugins: [
    new ESLintWebpackPlugin({}),
    new HtmlWebpackPlugin({
      title: "页面1", // 使用了 html-loader 无效 （<%= htmlWebpackPlugin.options.title %>）
      filename: "index.html", // 打包后的文件名
      template: path.resolve(appPath, "src/pages/page1/index.html"), // 打包的 html
      chunks: ["page1"], // 对于 entry 配置
    }),
    new HtmlWebpackPlugin({
      title: "页面2",
      filename: "page2.html",
      template: path.resolve(appPath, "src/pages/page2/index.html"),
      chunks: ["page2"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${path.resolve(appPath, "src")}/**/*`, { nodir: true }),
    }),
    new ProgressBarWebpackPlugin({
      format: `:msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
  ],
};
