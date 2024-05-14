const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

// for babel-loader
process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background.js',
    'content-script': './src/content-script.js',
    options: './src/options.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/.utils/'),
      '@options': path.resolve(__dirname, 'src/options/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: /src/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
  },
};
