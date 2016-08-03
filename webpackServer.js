var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

/*=============================================================================
	Start up the admin front-end for managing resources and settings
=============================================================================*/
new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(1402, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Frontend server running at: http://localhost:1402');
});
