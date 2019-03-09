var path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    'content-script': './src/content-script.js',
    options: './src/options.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
        include: /src/
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        include: /src/,
        query: {
          modules: true,
          localIdentName: '[name]-[local]--[hash:base64:5]'
        }
      }
    ]
  }
};
