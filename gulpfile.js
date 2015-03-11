var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpWebpack = require('gulp-webpack-build');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack-dev-server', function(callback) {
  var config = Object.create(webpackConfig);
  config.devtool = 'eval';
  config.debug = true;

  // Start the server
  new WebpackDevServer(webpack(config), {
    publicPath: '/' + config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

gulp.task('default', ['webpack-dev-server']);
