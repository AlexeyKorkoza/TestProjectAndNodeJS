'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-minify-css'),
  livereload = require('gulp-livereload'),
  concat = require('gulp-concat'),
  csslint = require('gulp-csslint'),
  jscpd = require('gulp-jscpd'),
  nodemon = require('gulp-nodemon'),
  jshint = require('gulp-jshint');

var scripts = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/angular/angular.min.js',
  'node_modules/angular-route/angular-route.min.js',
  'node_modules/selectize/dist/js/standalone/selectize.min.js',
  'node_modules/angular-loading-bar/build/loading-bar.min.js',
  'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
  'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
  'node_modules/leaflet/dist/leaflet.js',
  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/angular-selectize2/dist/selectize.js',
  'node_modules/sweetalert/dist/sweetalert.min.js',
  'node_modules/angular-simple-logger/dist/angular-simple-logger.js',
  'node_modules/ui-leaflet/dist/ui-leaflet.min.js',
  'node_modules/ngstorage/ngStorage.min.js',
  './app/assets/js/*.js',
  './app/app.js',
  './app/route.js',
  './app/services/*.js',
  './app/directivies/*.js',
  './app/SignIn/*.js',
  './app/Main/*.js',
  './app/SignUp/*.js',
  './app/Place/*.js',
  './app/TypeOfPlace/*.js',
  './app/UserProfile/*.js'
];

var styles = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/normalize.css/normalize.css',
  'node_modules/leaflet/dist/leaflet.css',
  'node_modules/selectize/dist/css/selectize.default.css',
  'node_modules/sweetalert/dist/sweetalert.css',
  'node_modules/angular-loading-bar/build/loading-bar.min.css',
  './app/assets/css/*.css'
];

gulp.task('jshint', function () {
  return gulp.src([
    './js/*.js',
    './js/Main/*.js',
    './js/SignIn/*.js',
    './js/SignUp/*.js',
    './js/Place/*.js',
    './js/directivies/*.js',
    './js/TypeOfPlace/*.js',
    './js/UserProfile/*.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('scripts', function () {
  return gulp.src(scripts)
    .on('error', console.log)
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./app/build/'))
    .pipe(livereload());
});

gulp.task('styles', function () {
  return gulp.src(styles)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(csslint())
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./app/build/'))
    .pipe(livereload());
});

gulp.task('server', function () {
  gulp.start('styles');
  gulp.start('scripts');
  nodemon({
    script: 'server.js',
    env: {'NODE_ENV': 'development'}
  })
});

gulp.task('start', ['server']);