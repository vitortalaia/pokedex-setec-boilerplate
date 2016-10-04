const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const neat = require('node-neat').includePaths;
const normalize = require('node-normalize-scss').includePaths;

const sassConfig = {
  includePaths: [].concat(normalize, neat)
};

module.exports = () => {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist'));
};
