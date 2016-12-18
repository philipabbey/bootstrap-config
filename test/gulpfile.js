// Install development dependencies with: npm install --only=dev
console.time("Loading plugins"); //start measuring
var gulp = require('gulp');
var bootstrapConfig = require('../index.js');
var customizeBootstrap = require('gulp-customize-bootstrap');
var less = require('gulp-less');
var fs = require('fs');
var deleteLines = require('gulp-delete-lines');
var dest = require('gulp-dest');
console.timeEnd('Loading plugins');

/*
Ideally, a test would:

 1. Check variables.less created here against node_modules/bootstrap/less/variables.less
    *  npm install gulp-customize-bootstrap
 2. Check less compilation succeded:
    *  npm install gulp-less
    a. Should be an empty variables.css file as variables produce no CSS
    b. Should be no errors from less.

Practically this is not proving easy as basic UNIX commands like sed, grep & sort for stripping
comments and manipulating text files are not available in npm or gulp. Event the ones that
perport to provide the functions are not actually working. ('gulp-delete-lines' does not strip
comments from the ends of lines, 'strip-comments' & 'gulp-strip-comments' seem to do nothing,
perhaps for .less files? No 'sort' equivalent.)

The only test here relies on showing a working example for manual verification. It has the same
number of useful lines of content as node_modules/bootstrap/less/variables.less after compilation.

THIS TEST FILE IS INCOMPLETE

*/

gulp.task('bootstrapVariables', function (done) {
  bootstrapConfig('./config.json', './variables-temp.less');
  done();
});

// ['bootstrapVariables'], 
gulp.task('stripComments-config', function () {
  return gulp.src('./variables-temp.less')
    .pipe(deleteLines({
      'filters': [
        /^\/\//i
      ]}))
    .pipe(deleteLines({
      'filters': [
        /^$/
      ]}))
    .pipe(dest('', {"basename": 'variables-config'}))
    .pipe(gulp.dest('./'));
});

gulp.task('stripComments-orig', function () {
  return gulp.src('../node_modules/bootstrap/less/variables.less')
    .pipe(deleteLines({
      'filters': [
        /^\/\//i
      ]}))
    .pipe(deleteLines({
      'filters': [
        /^$/
      ]}))
    .pipe(dest('', {"basename": 'variables-orig'}))
    .pipe(gulp.dest('./'));
});

gulp.task('compileBootstrap', ['bootstrapVariables'], function () {
  return gulp.src('../node_modules/bootstrap/less/bootstrap.less')
    .pipe(customizeBootstrap('./variables-temp.less'))
    .pipe(deleteLines({
      'filters': [
        /^\/\//i
      ]}))
    .pipe(deleteLines({
      'filters': [
        /^$/
      ]}))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['stripComments-config', 'stripComments-orig']);
