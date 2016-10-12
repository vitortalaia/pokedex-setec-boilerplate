const gulp = require('gulp');

gulp.task('webpack', require('./tasks/webpack'));
gulp.task('webserver', require('./tasks/webserver'));
gulp.task('sass', require('./tasks/sass'));
gulp.task('copy-index', require('./tasks/copy-index'));
gulp.task('images', require('./tasks/images'));
gulp.task('gh-pages', require('./tasks/gh-pages'));

const scripts = gulp.parallel('webpack');
const styles = gulp.parallel('sass');
const index = gulp.parallel('copy-index');

gulp.task('build', gulp.series(
  'copy-index',
  gulp.parallel('images', 'sass', 'webpack')
));

gulp.task('watch', () => {
  gulp.watch('./src/javascript/**/*.js', scripts);
  gulp.watch('./src/javascript/templates/*.hbs', scripts);
  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/index.html', index);
});

gulp.task('deploy', gulp.series('build', 'gh-pages'));

gulp.task('default', gulp.series('build', 'webserver', 'watch'));
