const path = require('path');
const webpack = require('webpack');

const config = require('../src/config');
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, '/src/');
const distPath = path.join(rootPath, '/build/');

const webpackConfig = {
  devtool: false,
  entry: {
    main: ['babel-polyfill', srcPath + 'electron']
  },
  output: {
    path: distPath,
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.(jsx|js)$/, include: srcPath, loaders: ['babel']}
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unused: true,
        dead_code: true,
        drop_debugger: true,
        drop_console: true
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
}

module.exports = webpackConfig;
