const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const config = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 7000,
    open: true,
  },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
};

module.exports = merge(common, config);
