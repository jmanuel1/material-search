var gulp   = require('gulp');
var yarn   = require('gulp-yarn');
var del    = require('del');
var spawn  = require(/*'gulp-spawn'*/'child_process').spawn;

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

var pythonProcess;
gulp.task('test', gulp.series(
  async function() { // Don't wait for exit, so async is used
    // Assume build has been run
    pythonProcess = spawn('python', ['-m', 'http.server'], {
      cwd: './build'
    });
    return pythonProcess;
  }, function() {
    return spawn('pytest', ['test.py'], {
      stdio: 'inherit', cwd: './test'
    });
  }, async function() {
    return pythonProcess.kill();
  })
);
