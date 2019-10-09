const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    // path: path.resolve(__dirname, 'public/'),
    // filename: 'bundle.js'
    filename: 'bundle.js',
    path: __dirname + 'public',
    publicPath: './public'
  },
  mode: 'development',
  module: {
    rules: [
      {
        // transpiles js, jsx
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        // transpile scss, style
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    publicPath: path.resolve(__dirname, '/public/'),
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  devtool: 'source-map',
  performance: { hints: false }
};
