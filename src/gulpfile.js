var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var runSequence = require('run-sequence');
var del = require('del');


gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('../dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function() {
  return gulp.src('js/**/*.js') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(gulp.dest('../dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass', 'js'], function(){
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['js']);   
});

gulp.task('build', function(callback) {
  runSequence(
    'sass',
    callback
  )
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '../'
    },
  })
})

gulp.task('clean:dist', function() {
  return del.sync('dist');
})