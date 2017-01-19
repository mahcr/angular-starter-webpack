const commonConfig        = require('./webpack.config.common.js');
const DefinePlugin        = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const helpers             = require('./scripts/helpers');
const LoaderOptionsPlugin = require('webpack/lib/NoErrorsPlugin');
const NoEmitOnErrorsPlugin    = require('webpack/lib/NoEmitOnErrorsPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');
const UglifyJsPlugin = require ('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge   = require('webpack-merge');
const WebpackMd5Hash = require('webpack-md5-hash');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  /**
   * Where assets will be placed
   */
  output: {
    path: helpers.root('../','dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  module: {
    rules: [
      /**
       * compile angular using AoT, angular router resolve lazy components
       */
      { test: /\.ts$/, use: [ '@ngtools/webpack', 'angular2-router-loader?aot=true' ] },
      /**
       * extract general styles to create a chuck
       */
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!postcss-loader!sass-loader'
          }),
        exclude: [ helpers.root('..', 'src', 'app') ]
      }
    ]
  },

  plugins: [
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: helpers.root('..','tsconfig-aot.json'),
      entryModule: helpers.root('..','src/app/app.module#AppModule')
    }),
    /**
     * create css chuck with the general styles
     */
    new ExtractTextPlugin('assets/stylesheets/[name].[hash].css'),
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
    new NoEmitOnErrorsPlugin(),
    /**
     * uglifyJS
     */
    new UglifyJsPlugin({
      beautify: false,
      output: {
        comments: false
      },
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
      }
    }),
    /**
     * pass options to uglifyJS
     */
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new WebpackMd5Hash(),
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
