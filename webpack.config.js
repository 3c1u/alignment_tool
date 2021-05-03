const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const outputPath = path.resolve(__dirname, './dist')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  /**
   * NOTE: https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-706840237
   */
  target: 'web',
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    path: outputPath,
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
              'babel-plugin-styled-components',
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  devServer: {
    contentBase: './public',
    watchContentBase: true,
    inline: true,
    hot: isDevelopment,
    historyApiFallback: true,
    compress: true,
    lazy: false,
    overlay: true,
    liveReload: isDevelopment,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
  ].filter(Boolean),
}
