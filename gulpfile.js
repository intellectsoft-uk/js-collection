var gulp = require('gulp'),
  karma = require('gulp-karma'),
  insert = require('gulp-insert'),
  rename = require("gulp-rename")
;

gulp.task('test', function() {
  var files = [
    'bower_components/lodash/dist/lodash.min.js',
    'src/collection.js',
    'tests/unit/**/*.js'
  ];
  return gulp.src(files)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      console.error(err.message);
      //throw err;
    });
});

gulp.task('test-package-global', function() {
  var files = [
    'bower_components/lodash/dist/lodash.min.js',
    'js-collection.js',
    'tests/package/global.js'
  ];
  return gulp.src(files)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      console.error(err.message);
    });
});

gulp.task('test-package-angular', function() {
  var files = [
    'bower_components/lodash/dist/lodash.min.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'angular-js-collection.js',
    'tests/package/angular.js'
  ];
  return gulp.src(files)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      console.error(err.message);
    });
});

gulp.task('test-package', ['test-package-global', 'test-package-angular'], function () {

});

gulp.task('package-global', function () {
  return gulp.src('src/collection.js')
    .pipe(insert.prepend('(function (window) {'))
    .pipe(insert.append('window.JsModel = Model;window.JsCollection = Collection;\n})(window);'))
    .pipe(rename('js-collection.js'))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('package-angular', function () {
  return gulp.src('src/collection.js')
    .pipe(insert.prepend('(function (angular) {'))
    .pipe(insert.append('angular.module(\'JsCollection\', [])'))
    .pipe(insert.append('.factory(\'JsModel\', function () { return Model; })'))
    .pipe(insert.append('.factory(\'JsCollection\', function () { return Collection; });\n'))
    .pipe(insert.append('\n})(angular);'))
    .pipe(rename('angular-js-collection.js'))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('package', ['package-global', 'package-angular'], function () {

});