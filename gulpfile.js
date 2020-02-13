var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify-es").default;
var browserSync = require("browser-sync").create();
var log = require("fancy-log");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var config = {
  dist: "./dist",
  source: "./_src",
  node: "./node_modules"
};

// Compile sass into CSS & auto-inject into browsers

gulp.task("bootstrap", function() {
  return gulp
    .src([config.source + "/scss/bootstrap-import.scss"])
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: [
          config.node + "/bootstrap/scss/",
          config.node + "/@fortawesome/fontawesome-pro/scss/",
          config.node + "/aos/src/sass/"
        ]
      })
    )
    .on("error", sass.logError)
    .pipe(rename("vendors.min.css"))
    .pipe(gulp.dest("./styles/"))
    .pipe(browserSync.stream());
});

gulp.task("css", function() {
  return gulp
    .src([config.source + "/scss/styles.scss"])
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .on("error", sass.logError)
    .pipe(gulp.dest("./styles/"))
    .pipe(browserSync.stream());
});

//JavaScript
gulp.task("compress", function() {
  return gulp
    .src([
      config.node + "/jquery/dist/jquery.min.js",
      config.node + "/popper.js/dist/umd/popper.min.js",
      config.node + "/bootstrap/dist/js/bootstrap.min.js",
      config.source + "/js/vendors/jquery-mobile.min.js",
      config.node + "/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.js",
      config.node + "/aos/dist/aos.js",
      config.node + "/@fortawesome/fontawesome-pro/js/all.min.js",
      config.source + "/js/vendors/modernizr.custom.17475.js"
      //config.source + '/js/main.js',
    ])
    .pipe(uglify())
    .pipe(concat("vendors.min.js"))
    .pipe(gulp.dest("./Scripts/"))
    .pipe(browserSync.stream());
});

//JavaScript
gulp.task("customJS", function() {
  return (
    gulp
      .src([config.source + "/js/main.js"])
      //.pipe(uglify())
      .pipe(concat("main.min.js"))
      .pipe(gulp.dest("./scripts/"))
      .pipe(browserSync.stream())
  );
});

//HTML
gulp.task("html", function() {
  return gulp
    .src(["./index.html"])
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});

// Static server
gulp.task(
  "serve",
  ["bootstrap", "css", "compress", "customJS", "html"],
  function() {
    browserSync.init({
      server: "./"
    });

    gulp.watch(config.source + "/scss/**/*.scss", ["css"]);
    gulp.watch(config.source + "/js/*.js", ["compress", "customJS"]);
    gulp.watch("./*.html", ["html"]).on("change", browserSync.reload);
  }
);

gulp.task("default", ["serve"]);
