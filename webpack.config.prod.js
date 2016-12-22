var webpack = require('webpack');
var path = require('path');
var px2rem = require('postcss-px2rem');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: [
    path.resolve(__dirname, './src/js/main.js')
  ],

  output: {
    publicPath: './build',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets=es2015'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: 'url-loader?limit=81920' // inline base64 URLs for <=80k images, direct URLs for the rest
      },
      {
        test: /\.(woff|svg|eot|ttf)$/,
        loader: 'file-loader'
      }
    ]
  },

  postcss: function() {
    return [
      px2rem({remUnit: 64}),
      autoprefixer({ browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 10"] })
    ];
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false // 去除注释
      },
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: 'index.html' }
    ])
  ]
}
