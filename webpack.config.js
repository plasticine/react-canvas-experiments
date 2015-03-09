var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var examplesPath = path.join(__dirname, './examples');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

var webpackConfig = {
  cache: true,
  watch: true,

  entry: fs.readdirSync(examplesPath).reduce(function (entries, dir) {
    var isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(examplesPath, dir)))
      entries[dir] = [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.join(examplesPath, dir, 'app.js')
      ];

    return entries;
  }, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '__build__/'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ }
    ]
  }
};

module.exports = webpackConfig;
