const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/javascript/index.js'),

  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },

      {
        test: /\.hbs/,
        exclude: /(node_modules)/,
        loader: 'handlebars-loader',
      },
    ],
  },

  resolve: {
    alias: {
      js: path.join(__dirname, 'src/javascript'),
      components: path.join(__dirname, 'src/javascript/components'),
    }
  },
};
