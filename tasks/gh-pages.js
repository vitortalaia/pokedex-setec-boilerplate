const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

module.exports = () => {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
};
