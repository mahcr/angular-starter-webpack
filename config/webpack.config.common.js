var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var tslinConfig = require('./tslint');

module.exports = {
  // will create 3 different files
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  output: {
      // to create each file with the same of the key of entry
      filename: '[name].js'
  },

  resolve: {
    // make webpack understand imports
    extensions: ['', '.ts', '.js', '.css', '.scss'],
    modulesDirectories: ['node_modules']
  },

  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/] }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file?name=assets/imgs/[name].[hash].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/fonts/[name].[hash].[ext]'
      },
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
        test: /\.scss$/,
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
  plugins: [
    /**
     * find shared dependecies and remove them from left to right
     * if app -> share dependecies with vendor they will be removed from app
     * */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
