const gulp = require('gulp');
const webserver = require('gulp-webserver');

const options = {
  fallback: 'index.html',
  livereload: true,
  open: true
};

module.exports = () => {
  return gulp.src('./dist')
    .pipe(webserver(options));
};
