const path = require('path');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon', 'fixture'],

    files: [
      'node_modules/sinon-stub-promise/index.js',
      'spec/fixtures/**/*.html',
      'spec/entry.js',
    ],

    preprocessors: {
      '**/*.html': ['html2js'],
      'spec/entry.js': ['webpack'],
    },

    webpack: {
      devtool: 'inline-source-map',

      resolve: {
        alias: {
          fixtures: path.join(__dirname, 'spec/fixtures'),
          js: path.join(__dirname, 'src/javascript/'),
          components: path.join(__dirname, 'src/javascript/components'),
        },
      },

      module: {
        preLoaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.js$/,
            include: /src\/javascript/,
            loader: 'babel-istanbul',
          },
          {
            test: /\.hbs$/,
            include: /src\/javascript\/templates/,
            loader: 'handlebars-loader',
          },
        ],
      },
    },

    reporters: ['mocha', 'notify', 'coverage'],

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.',
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,
  });
};
