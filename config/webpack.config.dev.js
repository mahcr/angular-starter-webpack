const commonConfig = require('./webpack.config.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const tslinConfig = require('./tslint');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      { // preloader
        enforce: 'pre',
        test: /\.ts$/,
        use: 'tslint-loader',
        exclude: /(node_modules)/,
      },
      { // handle general styles
        test: /\.css$/,
        include: helpers.root('src', 'app/theme'),
        use: ExtractTextPlugin.extract( { fallbackLoader: 'css-loader', loader: 'css?sourceMap' })
      },
      { // handle component styles
        test: /\.css$/,
        exclude: helpers.root('src', 'app/theme'),
        include: helpers.root('src', 'app'),
        use: 'raw'
      },
      { // handle general styles
        test: /\.global\.scss$/,
        include: helpers.root('src', 'app/theme'),
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
      { // handle component scss
        test: /\.scss$/,
        exclude: [/node_modules/, helpers.root('src', 'app/theme')],
        include: helpers.root('src', 'app'), // remove
        use: ['exports-loader?module.exports.toString()', 'css-loader', 'sass-loader']
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }

});
