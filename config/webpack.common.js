const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const tsConfigFile = path.join(__dirname, '../tsconfig.json');

const config = {
  entry: path.join(__dirname, '../src/index'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigFile,
      }),
    ],
    fallback: {
      // stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          {
            // Creates `style` nodes from JS strings
            loader: 'style-loader',
          },
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            // Compiles Sass to CSS
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    // Work around for Buffer is undefined:
    // https://viglucci.io/how-to-polyfill-buffer-with-webpack-5
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};

module.exports = config;
