const commonConfig = require('./webpack.config.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const helpers             = require('./helpers');
const LoaderOptionsPlugin = require('webpack/lib/NoErrorsPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require ('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge   = require('webpack-merge');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

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
    rules: [ ]
  },

  plugins: [
    /**
     * create css chuck with general styles
     */
    new ExtractTextPlugin('assets/stylesheets/name].[hash].css'),
    /**
     * minify CSS code
     */
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    /**
     * remove webpack erros
     */
    new NoErrorsPlugin(),
    /**
     * uglifyJS
     */
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
    /**
     * pass options to uglifyJS
     */
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    /**
     * define process.env variable in scripts
     */
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
