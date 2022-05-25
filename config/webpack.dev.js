const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const TerserWebpackPlugin = require("terser-webpack-plugin"); // 优化压缩js文件 webpack5内置

const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      // 解析图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          publicPath: "/",
          filename: "images/[hash][ext][query]",
        },
      },
      // 解析字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset",
        generator: {
          publicPath: "/",
          filename: "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|lib)/,
        use: [
          {
            loader: path.resolve(__dirname, "./loaders/console-loader"),
          },
          {
            loader: path.resolve(__dirname, "./loaders/banner-loader"),
            options: { author: "qiuqfang", description: "这是自动生成的banner" },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin()],
  },
  devServer: {
    compress: true, // 开启gzip压缩
    open: true,
    port: 9000,
    hot: true, // 热更新
  },
});
