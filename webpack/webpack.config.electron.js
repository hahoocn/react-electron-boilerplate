const path = require('path');
const webpack = require('webpack');

const config = require('../src/config');
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, '/src/');
const distPath = path.join(rootPath, '/build/');

const webpackConfig = {
  devtool: false,
  entry: {
    main: ['@babel/polyfill', srcPath + 'electron']
  },
  output: {
    path: distPath,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: srcPath,
        use: ['babel-loader']
      },
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      STAGE: 'prod'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production',
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  },
}

module.exports = webpackConfig;
