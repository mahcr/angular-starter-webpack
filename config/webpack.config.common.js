'use strict';

import ContextReplacementPlugin from 'webpack/lib/ContextReplacementPlugin';
import CommonsChunkPlugin       from 'webpack/lib/optimize/CommonsChunkPlugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';
import { root }           from './scripts/helpers';
import HtmlWebpackPlugin  from 'html-webpack-plugin';

export const common = {
  // will create 3 different files
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  output: {
    filename: '[name].js'
  },

  resolve: {
    // make webpack understand imports
    extensions: [ '.ts', '.js', '.css', '.scss' ],
    modules: [ 'node_modules' ]
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader?name=assets/imgs/[name].[hash].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
      },
      /**
       *  handle general styles / TODO: need refactor
       */
      // {
      //   test: /\.css$/,
      //   include: root('src', 'app/theme'),
      //   use: [
      //           ExtractTextPlugin.extract( { fallbackLoader: 'css-loader', loader: 'css?sourceMap' } ),
      //          'postcss-loader'
      //        ]
      // },
      /**
       *  handle component styles / TODO: need refactor
       */
      // {
      //   test: /\.css$/,
      //   exclude: root('src', 'app/theme'),
      //   include: root('src', 'app'),
      //   use: 'raw'
      // },
      /**
       * get component styles and return a string
       */
      {
        test: /\.scss$/,
        use: [ 'to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader' ],
        exclude: [ root('..','src', 'theme') ]
      },

    ]
  },

  plugins: [
    /**
     * find shared dependecies and remove them from left to right
     * if app -> share dependecies with vendor they will be removed from app
     * */
    new CommonsChunkPlugin({
      name: [ 'app', 'vendor', 'polyfills' ]
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import / fix Critical dependency issue
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        root('src')
      )
  ]

};
