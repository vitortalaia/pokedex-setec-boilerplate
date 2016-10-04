const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = () => {
  return gulp.src('./src/images/**/*.{jpg,svg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
};
