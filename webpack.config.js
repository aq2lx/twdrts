const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js',
    xp: './src/xp.js',
    ap: './src/ap.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[contenthash].js',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|jpg)$/,
        loader: 'file-loader'
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    ...['index', 'xp', 'ap', '404'].map((x) => {
      return new HtmlWebpackPlugin({
        inject: false,
        filename: `${x}.html`,
        template: `src/${x}.html`
      })
    })
  ]
}
