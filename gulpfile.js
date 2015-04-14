/* jshint node: true */
'use strict';
var gulp = require('gulp');
var del = require('del');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var noop = function() {};
var stylish = require('gulp-jscs-stylish');
var jsonlint = require('gulp-jsonlint');
var csslint = require('gulp-csslint');
var sloc = require('gulp-sloc');

var options = {
  param: { // Project settings
    debug: false,
    src: 'public',
    build: 'build',
    tmp: '.tmp',
    dst: 'dist',
    pack: 'pack',
    www: 'www'
  }
};

var lintSources = ['*.js', options.param.src + '/**/*.js'];

gulp.task('jsonlint', function() {
  return gulp.src([
      'package.json',
      'bower.json',
      options.param.src + '/manifest.webapp',
      options.param.src + '/manifest.json',
      options.param.src + '/**/*.json'
    ])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

gulp.task('csslint', function() {
  return gulp.src(options.param.src + '/style/**/*.css')
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('sloc-client', function() {
  gulp.src([
      options.param.src + '/*.html',
      options.param.src + '/js/*.js',
      options.param.src + '/style/*.css'
    ])
    .pipe(sloc());
});

gulp.task('sloc-server', function() {
  gulp.src([
    'server.js',
    ])
    .pipe(sloc());
});

gulp.task('clean-dist', function(cb) {
  del([
    options.param.dst,
    options.param.tmp,
    options.param.build,
    options.param.pack,
    options.param.www,
    'docs'
  ], cb);
});

/**
 * Runs JSLint and JSCS on all javascript files found in the app dir.
 */
gulp.task('lint', ['jsonlint', 'csslint', 'sloc-server', 'sloc-client'],
  function() {
    return gulp.src(lintSources)
      .pipe(jshint('.jshintrc'))
      .pipe(jscs('.jscsrc'))
      .on('error', noop) // don't stop on error
      .pipe(stylish.combineWithHintResults())
      .pipe(jshint.reporter('default'));
  });

gulp.task('githooks', function() {
  return gulp.src(['pre-commit'])
    .pipe(gulp.dest('.git/hooks'));
});

