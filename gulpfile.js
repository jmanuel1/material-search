var gulp = require("gulp");
var yarn = require("gulp-yarn");
var del = require("del");
var spawn = require("child_process").spawn;

gulp.task(
  "build",
  gulp.series(
    function() {
      // Ensure that packages are installed.
      return gulp.src(["./package.json", "./yarn.lock"]).pipe(yarn());
    },
    function() {
      return spawn("polymer", ["build", "--name", "dev"], {
        stdio: "inherit",
        cwd: ".",
        // ENOENT without this option, I think because we are invoking a batch
        // script
        shell: true
      });
    }
  )
);

var pythonProcess;
gulp.task(
  "test",
  gulp.series(
    async function() {
      // Don't wait for exit, so async is used
      // Assume build has been run
      pythonProcess = spawn("python", ["-m", "http.server"], {
        cwd: "./build/dev"
      });
      return pythonProcess;
    },
    function() {
      return spawn("pytest", ["test.py"], {
        stdio: "inherit",
        cwd: "./test"
      });
    },
    async function() {
      return pythonProcess.kill();
    }
  )
);

gulp.task(
  "mypy",
  gulp.series(
    function() {
      process.env.MYPYPATH = "test/stubs/";
      var pythonProcess = spawn("mypy", ["test"], {
        cwd: ".",
        stdio: "inherit"
      });
      return pythonProcess;
    },
    async function() {
      return pythonProcess.kill();
    }
  )
);

// Note: Prettier git hook is used instead of a JS linter with gulp

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
