const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.config.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const helpers = require('./helpers');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const UglifyJsPlugin = require ('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge = require('webpack-merge');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const extractCSS = new ExtractTextPlugin('assets/stylesheets/[name].css');

module.exports = webpackMerge(commonConfig, {
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.global\.scss$/i,
        use: [ ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader'] }),
               'to-string-loader',
               'css-loader',
               'sass-loader' ]
      },
      { // handle component scss
        test: /\.scss$/,
        exclude: [/node_modules/, helpers.root('src', 'app/theme')],
        include: helpers.root('src', 'app'), // remove
        use: ['exports-loader?module.exports.toString()', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    extractCSS,
    new NoErrorsPlugin(),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        keep_fnames: true
      },
      sourceMap: false
    }),
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
