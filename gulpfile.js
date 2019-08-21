var gulp   = require('gulp');
var yarn   = require('gulp-yarn');
var jshint = require('gulp-jshint');
var del    = require('del');
var spawn  = require('child_process').spawn;

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

gulp.task('mypy', gulp.series(
  function() {
    process.env.MYPYPATH = 'test/stubs/';
    var pythonProcess = spawn('mypy', ['test'], {
      cwd: '.', stdio: 'inherit'
    });
    return pythonProcess;
  }, async function() {
    return pythonProcess.kill();
  })
);

gulp.task('lint', function() {
  // codepainter (https://github.com/jedmao/codepainter) derived the following
  // options:
  /* {
    "indent_style":"space",
    "indent_size":2,
    "insert_final_newline":true,
    "quote_type":"auto",
    "space_after_anonymous_functions":false,
    "space_after_control_statements":true,
    "spaces_around_operators":true,
    "trim_trailing_whitespace":true,
    "spaces_in_brackets":false,
    "end_of_line":"crlf"
  }
  */
  return gulp.src(['./scripts/**/*.js', './*.json', '!package.json', './*.js'])
    .pipe(jshint({
      latedef: true,
      newcap: true,
      nonew: true,
      quotmark: true, // TODO: Option deprecated
      maxcomplexity: 7,
      maxlen: 80,
      mocha: false,
      indent: 2, // TODO: Option deprecated
      esversion: 8 // async functions
    }))
    .pipe(jshint.reporter('default'));
});
