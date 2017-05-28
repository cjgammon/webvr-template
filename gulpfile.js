var gulp = require('gulp');
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var compass = require('gulp-compass');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var minify = require('gulp-minify');
var preprocess = require('gulp-preprocess');
var ftp = require('gulp-ftp');
var gutil = require('gulp-util');

/* MAIN TASKS */
gulp.task('default', ['webpack', 'compass', 'copy', 'process']);

gulp.task('prod', ['webpack-prod', 'compass', 'copy', 'process-prod']);

gulp.task('watch', ['default'], function () {
  gulp.watch('src/js/**/*.js', ['webpack']);
  gulp.watch('src/js/**/*.json', ['webpack']);
  gulp.watch('src/*.html', ['process']);
  gulp.watch('src/sass/*.scss', ['compass']);
  gulp.watch('src/js/vendor/*', ['copy']);
  gulp.watch('src/assets/**/*', ['copy']);
});

/* SUB TASKS */
gulp.task('process', function () {
  gulp.src(["src/*.html"])
    .pipe(preprocess({context: { ENV: 'dev'}}))
    .pipe(gulp.dest("site/"));
});

gulp.task('process-prod', function () {
  gulp.src(["src/*.html"])
    .pipe(preprocess({context: { ENV: 'production'}}))
    .pipe(gulp.dest("site/"));
});

gulp.task('webpack', function () {
  return gulp.src('src/js/App.js')
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest('site/js/'));
});

gulp.task('webpack-prod', function () {
  return gulp.src('src/js/App.js')
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(minify())
    .pipe(gulp.dest('site/js/'));
});

gulp.task('copy', function() {

  gulp.src(["src/js/external/*"])
    .pipe(gulp.dest("site/js/external/"));

  gulp.src(["src/assets/**/*"])
    .pipe(gulp.dest("site/assets/"));
});

gulp.task('babel', function() {
  gulp.src(["src/js/**/*.js", "!src/js/vendor/"])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest("site/js/"));
});

gulp.task('compass', function() {
  gulp.src('src/sass/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'site/css',
      sass: 'src/sass'
    }))
    .pipe(gulp.dest('site/css'));
});


gulp.task('deploy', function() {
    gulp.src('site/**/*')
        .pipe(ftp({
            host: 'radiolights.com',
            user: 'cjgammon',
            pass: 'tarheel',
            remotePath: 'radiolights.com/'
        }))
});
