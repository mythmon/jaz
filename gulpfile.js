var browserify = require('browserify');
var es6ify = require('es6ify');
var gulp = require('gulp');
// var source = require('vinyl-source-stream');
// var traceur = require('gulp-traceur');
var rimraf = require('rimraf');
var webserver = require('gulp-webserver');
var fs = require('fs');

gulp.task('build', function() {
  return browserify({ debug: true })
    .add(es6ify.runtime)
    .transform(es6ify)
    .require(require.resolve('./src/main.js'), {entry: true})
    .bundle()
    .pipe(fs.createWriteStream('./app.js'));
});

gulp.task('server', ['build'], function() {
  return gulp.src(['.', 'dist'])
    .pipe(webserver());
});
