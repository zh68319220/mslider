'use strict';
let open = require("open");
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js');
let ip = '10.2.24.49'; // 本机IP地址

//启动服务
let server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: false,
  noInfo: false,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(8080, ip, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at http://'+ip+':8080');
  open("http://"+ip+":8080/src/index.html", "chrome");
});
