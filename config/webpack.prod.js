var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.config.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');

module.exports = webpackMerge(commonConfig, {
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  module: {
    loaders: [
      {
        test: /\.global\.scss$/i,
        loader: extractCSS.extract(['css','sass-loader'])
      },
      { // handle component scss
        test: /\.scss$/,
        exclude: [/node_modules/, helpers.root('src', 'app/theme')],
        include: helpers.root('src', 'app'), // remove
        loaders: ['exports-loader?module.exports.toString()', 'css', 'sass']
      }
    ]
  },

  plugins: [
    extractCSS,
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        keep_fnames: true
      },
      sourceMap: false
    }),
    new ExtractTextPlugin('./dist/assets/testing.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
