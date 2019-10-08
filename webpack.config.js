const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './client/app.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        // transpiles js, jsx
        test: /\.jsx?/,
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
    publicPath: path.resolve(__dirname, '/build/'),
    port: 8080,
    proxy: {
      // firugre this one out : 'http://localhost:3000'
    }
  }
};
