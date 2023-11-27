const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "net": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "path": require.resolve("path-browserify")
    }
  }
};
