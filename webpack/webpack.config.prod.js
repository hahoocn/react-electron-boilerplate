const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const CleanPlugin = require('clean-webpack-plugin');

const config = require('../src/config');
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, '/src/');
const distPath = path.join(rootPath, '/build/');

const webpackConfig = {
  devtool: false,
  entry: {
    main: ['babel-polyfill', srcPath + 'index']
  },
  output: {
    path: distPath,
    filename: 'js/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        include: srcPath,
        loaders: ['babel']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&minimize&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url?limit=8192&name=images/[name].[ext]!image-webpack?{ progressive:true, optimizationLevel: 7 }'
      },
      {
        test: /\.svg$/,
        include: srcPath,
        loader: 'url?limit=8192&name=svg/[name].[ext]&mimetype=image/svg+xml!image-webpack?{ svgo: {plugins: [{ removeUselessDefs: false }, { removeTitle: true }, { removeRasterImages: true }, { sortAttrs: true } ]} }'
      },
      {
        test: /\.svg(\?[\s\S]+)?$/,
        exclude: srcPath,
        loader: 'url?limit=8192&name=fonts/[name].[ext]&mimetype=image/svg+xml'
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=8192&name=fonts/[name].[ext]"
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ],
  },
  postcss: function () {
    return [postcssMixins, postcssSimpleVars, postcssNested, autoprefixer];
  },
  plugins: [
    new CleanPlugin([distPath], {
      root: rootPath
    }),
    new HtmlWebpackPlugin({
      title: config.app.title,
      hash: true,
      template: srcPath + 'template/index.html',
      filename: distPath + 'index.html'
    }),
    new ExtractTextPlugin('css/[name].css'),
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
  }
}

module.exports = webpackConfig;
