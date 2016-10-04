const gulp = require('gulp');

module.exports = () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
};
