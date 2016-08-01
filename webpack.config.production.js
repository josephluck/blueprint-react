var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: [
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
      path.join(__dirname, 'src')
    ],
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map', // Dev with debugger
  // devtool: 'source-map', // Production
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("style.css", {allChunks: false}),
    new WebpackNotifierPlugin({title: 'Blueprint build'}),
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
          path.join(__dirname, 'src')
        ]
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      },
    ]
  }
};