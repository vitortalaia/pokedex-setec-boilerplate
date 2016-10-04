const gulp = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const config = require('../webpack.config')

module.exports = () => {
  return gulp.src('./src/javascript/index.js')
    .pipe(plumber())
    .pipe(webpack(config))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist'));
};
