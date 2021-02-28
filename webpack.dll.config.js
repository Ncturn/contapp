const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = {
  entry: {
    react: [
      'react',
      'react-dom',
      'react-hook-form',
      'react-router-dom',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, 'build/[name]-manifest.json'),
    }),
  ],
};
