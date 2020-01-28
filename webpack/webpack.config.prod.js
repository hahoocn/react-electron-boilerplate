const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = require('../src/config');
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, '/src/');
const distPath = path.join(rootPath, '/build/');

const webpackConfig = {
  devtool: false,
  entry: {
    main: ['@babel/polyfill', srcPath + 'index']
  },
  output: {
    path: distPath,
    filename: 'js/[chunkhash].[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: srcPath,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        include: srcPath,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [postcssMixins, postcssSimpleVars, postcssNested, autoprefixer]
            },
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: srcPath,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: srcPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '/svg/[name].[ext]',
              mimetype: 'image/svg+xml'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  removeUselessDefs: false
                },
                {
                  removeTitle: true
                },
                {
                  removeRasterImages: true
                },
                {
                  sortAttrs: true
                }
              ]
            }
          },
        ]
      },
      {
        test: /\.svg(\?[\s\S]+)?$/,
        exclude: srcPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '/fonts/[name].[ext]'
            }
          },
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '/fonts/[name].[ext]'
            }
          },
        ]
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/fonts/[name].[ext]'
            }
          },
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [distPath]
    }),
    new HtmlWebpackPlugin({
      title: config.app.title,
      hash: false,
      template: srcPath + 'template/index.html',
      filename: distPath + 'index.html',
      // inject: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[chunkhash].[name].css',
      ignoreOrder: true
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      STAGE: 'prod'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'production'
};

module.exports = webpackConfig;
