var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:1402',
    'webpack/hot/dev-server',
    'babel-polyfill',
    './src/index',
    './less/main.less',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: ['babel'],
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react']
        },
        include: path.join(__dirname, 'src')
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
        include: [new RegExp(path.join(__dirname, 'src'))]
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  }
};
