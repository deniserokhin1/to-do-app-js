const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'assets/resource',
        use: 'url-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'assets/resource',
        loader: 'url-loader',
      },
      { type: 'javascript/auto' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  devtool: isProduction ? 'hidden-source-map' : 'source-map',
};
