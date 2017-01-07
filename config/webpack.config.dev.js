const commonConfig      = require('./webpack.config.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers           = require('./scripts/helpers');
const webpackMerge      = require('webpack-merge');

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
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader?tsconfig=../tsconfig.json', 'angular2-template-loader']
      }
    ]
  },

  plugins: [
    /**
     * create file
     */
    new ExtractTextPlugin('assets/stylesheets/[name].css'),
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }

});
