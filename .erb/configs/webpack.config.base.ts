/**
 * Base webpack config used across other specific configs
 * webpack 学习文档: https://www.webpackjs.com/concepts/#entry
 */
import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

/**
 * //导出另一种写法，module.exports/exports导出 - 引入require();
 * module.exports = {
    entry: './path/to/my/entry/file.js',
  };
 */
const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],
  stats: 'errors-only',
  module: {
    /**
     * loader 用于对模块的源代码进行转换。
     * 多个loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。
     */
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            //删除这一行以在webpack构建中启用类型检查
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
      },
    ],
  },
  /**
   * 可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。
   * 注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。
   */
  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },
  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};

export default configuration;
