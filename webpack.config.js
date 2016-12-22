var webpack = require('webpack');
var path = require('path');
var px2rem = require('postcss-px2rem');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ip = '10.2.24.49'; // 本机IP地址

module.exports = {

  devServer: { //调试服务器配置
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './src',
    port: 8080
  },

  entry: [
    'webpack-dev-server/client?http://'+ip+':8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './src/js/main.js')
  ],

  output: {
    publicPath: 'http://'+ip+':8080/src/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src')
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
        loader: 'url-loader?limit=8192' // inline base64 URLs for <=80k images, direct URLs for the rest
      },
      {
        test: /\.(woff|svg|eot|ttf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      }
    ]
  },

  postcss: function() {
    return [
      px2rem({remUnit: 64}), // 64 or 75
      autoprefixer({ browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 10"] })
    ];
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ 
      template: 'html-withimg-loader!'+path.resolve(__dirname+'/src', 'index.html'), filename: 'index.html' 
    })
  ]
}
