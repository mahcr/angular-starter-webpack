var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.config.common.js');
var helpers = require('./helpers');
var tslinConfig = require('./tslint');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/] }
    ],
    loaders: [
      { // handle general styles
        test: /\.css$/,
        include: helpers.root('src', 'app/theme'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      { // handle component styles
        test: /\.css$/,
        exclude: helpers.root('src', 'app/theme'),
        include: helpers.root('src', 'app'),
        loader: 'raw'
      },
      { // handle general styles
        test: /\.global\.scss$/,
        include: helpers.root('src', 'app/theme'),
        loaders: ['style-loader', 'css-loader', 'resolve-url', 'sass-loader?sourceMap']
      },
      { // handle component scss
        test: /\.scss$/,
        exclude: [/node_modules/, helpers.root('src', 'app/theme')],
        include: helpers.root('src', 'app'), // remove
        loaders: ['exports-loader?module.exports.toString()', 'css', 'sass']
      }
    ]
  },

  tslint: tslinConfig,

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
