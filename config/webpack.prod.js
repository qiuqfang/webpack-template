const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const TerserWebpackPlugin = require("terser-webpack-plugin"); // 优化压缩js文件 webpack5内置
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // gzip压缩
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 分析打包后的文件

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const speedMeasurePlugin = new SpeedMeasurePlugin();

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      // 解析图片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          publicPath: "/dist/",
          filename: "images/[hash][ext][query]",
        },
      },
      // 解析字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset",
        generator: {
          publicPath: "/dist/",
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    /* 开启gzip压缩 */
    new CompressionWebpackPlugin({
      test: /\.js$|\.html$|\.css/,
      include: undefined,
      exclude: undefined,
      algorithm: "gzip",
      compressionOptions: { level: 9 },
      threshold: 0,
      minRatio: 0.8,
      filename: "[path][base].gz",
      deleteOriginalAssets: false, // 项目上线时改为true，为了开启打包文件分析工具必须改为false
    }),
    new BundleAnalyzerPlugin(),
  ],
});
