var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
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
  // devtool: 'eval-source-map', // Dev with debugger
  devtool: 'source-map', // Production
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
    new ExtractTextPlugin("style.css", {allChunks: false})
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
      },
    ]
  }
};