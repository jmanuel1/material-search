var gulp   = require('gulp');
var yarn   = require('gulp-yarn');
var del    = require('del');

gulp.task('build', gulp.series(function() {
  // Ensure that packages are installed.
  return gulp.src(['./package.json', './yarn.lock'])
    .pipe(yarn());
}, function() {
  return del('./build/**');
}, function() {
  // Copy the whole project into a directory (perhaps ./build/)
  // Copies only @bower_components of node_modules to cut build time from ~10
  // min. to ~2 min.
  return gulp.src(['./**', '!./node_modules/**']) // ignores ./.git
    .pipe(gulp.dest('./build/'));
}, function() {
  return gulp.src(['./node_modules/@bower_components/**'])
    .pipe(gulp.dest('./build/node_modules/@bower_components/'));
}));
