var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 
var rev = require('gulp-rev'); 
var revReplace = require('gulp-rev-replace');
var revDel = require('gulp-rev-del-redundant');
var save = require('gulp-save');
var package = require('./package.json');

 

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '../'
    },
  })
})

//script paths
var cssFiles = [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'scss/**/*.scss'
    ],  
    cssDest = 'compiled/css';

gulp.task('sass', function() {
  return gulp.src(cssFiles) // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(cssDest))
    .pipe(browserSync.reload({
      stream: true
    }))
})


//script paths
var jsFiles = [
      'js/jquery.min.js',
      'node_modules/jquery-mousewheel/jquery.mousewheel.js',
      'node_modules/hammerjs/hammer.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/nunjucks/browser/nunjucks.js',
      'bower_components/d3/d3.js',
      'js/svg-pan-zoom.js',
      'js/helper-functions.js',
      'js/app.js'
    ],  
    jsDest = 'compiled/js';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        //.pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(browserSync.reload({
          stream: true
        }));
})

gulp.task('rev', ['sass', 'scripts'], function() {
  return gulp.src(['compiled/css/**/*.css', 'compiled/js/**/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('../dist/assets'))
    .pipe(rev.manifest()) 
    .pipe(gulp.dest('../dist'))    
    .pipe(revDel({ dest: '../dist/assets', force: true }));
})


gulp.task("revreplace", ["rev"], function(){
  var manifest = gulp.src("../dist/rev-manifest.json");

  return gulp.src("../dist/index.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest("../"));
})

 
gulp.task('watch', ['browserSync', 'sass', 'scripts'], function(){
  gulp.watch('scss/**/*.scss', ['sass']);
  //ulp.watch('js/**/*.js', ['scripts']);     
})
 

gulp.task('build', function(callback) {
  runSequence(
    'sass',
    'scripts',
    callback
  )
})

gulp.task('build-production', function(callback) {
  runSequence(
    'sass',
    'scripts',
    'revreplace',
    callback
  )
})
 


 