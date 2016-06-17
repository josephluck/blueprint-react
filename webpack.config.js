var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:1402',
    'webpack/hot/dev-server',
    'babel-polyfill',
    './scripts/index',
    './less/main.less',
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    root: path.resolve('./scripts'),
    // alias: {
    //   'react': 'react-lite',
    //   'react-dom': 'react-lite'
    // },
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
        include: path.join(__dirname, 'scripts')
      },
      {
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
    ]
  }
};
