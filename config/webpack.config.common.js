const ContextReplacementPlugin  = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin        = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers           = require('./scripts/helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
        test: /\.ts$/,
        use: ['awesome-typescript-loader?tsconfig=../tsconfig.json', 'angular2-template-loader']
      },
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
       *  handle general styles
       */
      {
        test: /\.css$/,
        include: helpers.root('src', 'app/theme'),
        use: [
                ExtractTextPlugin.extract( { fallbackLoader: 'css-loader', loader: 'css?sourceMap' } ),
               'postcss-loader'
             ]
      },
      /**
       *  handle component styles
       */
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app/theme'),
        include: helpers.root('src', 'app'),
        use: 'raw'
      },
      /**
       * extra general styles to create a chuck
       */
      {
        test: /\.global\.scss$/i,
        use: [
               ExtractTextPlugin.extract( { fallbackLoader: 'style-loader', loader: ['to-string-loader'] } ),
               'css-loader',
               'postcss-loader',
               'sass-loader'
             ]
      },
      /**
       * in charged of process sass in components
       * exports-loader - fix url issue
       */
      { // handle component scss
        test: /\.scss$/,
        exclude: [ /node_modules/, helpers.root('src', 'app/theme') ],
        include: helpers.root('src', 'app'), // remove
        use: [ 'exports-loader?module.exports.toString()', 'css-loader', 'postcss-loader', 'sass-loader' ]
      }
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
        helpers.root('src')
      )
  ]

};
