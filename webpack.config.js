var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:1402',
    'webpack/hot/dev-server',
    'babel-polyfill',
    './src/index',
    './less/index.less',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'backend')
    ],
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackNotifierPlugin({title: 'Blueprint'})
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: ['babel'],
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react']
        },
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'backend')
        ]
      },
      {
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          new RegExp(path.join(__dirname, 'src'))
        ]
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  }
};
