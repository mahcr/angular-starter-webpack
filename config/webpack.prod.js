const commonConfig = require('./webpack.config.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const helpers             = require('./helpers');
const LoaderOptionsPlugin = require('webpack/lib/NoErrorsPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const UglifyJsPlugin = require ('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge   = require('webpack-merge');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const extractCSS = new ExtractTextPlugin('assets/stylesheets/[name].css');

module.exports = webpackMerge(commonConfig, {
  /**
   * Wheren the assets will be built
   */
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      /**
       * create extract sass and create global file
       */
      {
        test: /\.global\.scss$/i,
        use: [ ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader'] }),
               'to-string-loader',
               'css-loader',
               'sass-loader' ]
      },
      /**
       * in charge of extract Sass styles
       * exports-loader - fix url issue
       */
      {
        test: /\.scss$/,
        exclude: [/node_modules/, helpers.root('src', 'app/theme')],
        include: helpers.root('src', 'app'),
        use: ['exports-loader?module.exports.toString()', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    extractCSS,
    new NoErrorsPlugin(),
    new UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        keep_fnames: false
      },
      sourceMap: false
    }),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
