'use strict';

import { common }      from './';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { root }           from './scripts/helpers';
import webpackMerge      from 'webpack-merge';

export const dev = webpackMerge(common, {

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      /**
       * run tslint
       */
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: 'tslint-loader',
        exclude: /(node_modules)/,
      },
      /**
       * run angular in jit mode
       */
      {
        test: /\.ts$/,
        use: [ 'awesome-typescript-loader?tsconfig=../tsconfig.json',
               'angular2-template-loader',
               'angular2-router-loader' ]
      },
      /**
       * load general theme styles
       */
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        include: [ root('..','src', 'theme') ]
      },
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
