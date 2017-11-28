var gulp = require('gulp');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 
var rev = require('gulp-rev'); 
var revReplace = require('gulp-rev-replace');
var revDel = require('gulp-rev-del-redundant');
var save = require('gulp-save');
var jsonmin = require('gulp-jsonmin');
var nunjucksRender = require('gulp-nunjucks-render');
let cleanCSS = require('gulp-clean-css');
var svgmin = require('gulp-svgmin');
var package = require('./package.json');
var fs = require('fs');
var dom  = require('gulp-dom'); //modify the dom
var replace = require('gulp-string-replace'); //replace strings in html
var svgSprite = require("gulp-svg-sprites"); //generate sprites for svg
var gutil = require('gulp-util'); //needed for critical
var critical = require('critical').stream; //inline critical css
var gzip = require('gulp-gzip');//gzip assets
var htmlmin = require('gulp-htmlmin'); //minify html
var jshint = require('gulp-jshint');
var babelPolyfill = require("babel-polyfill");
var babel = require("gulp-babel");
var browserify = require('gulp-browserify');
var babelify = require('babelify');
 
//script paths
var cssFiles = [
  'scss/**/*.scss'
],  
cssDest = 'compiled/css';


gulp.task('sass', function() {
  return gulp.src(cssFiles) // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(cssDest))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssDest))
})

gulp.task('autoprefixer', function () {
  var postcss      = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');

  return gulp.src(cssDest)
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest(cssDest));
});
// gulp.task('autoprefixer', function() {
//     gulp.src(cssFiles)
//         .pipe(postcss(
//           [autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         })]
//         ))
//         .pipe(gulp.dest(cssDest))
// });

//script paths
var jsFiles = [
      'js/lib/intersection-observer-polyfill.js',
      'js/lib/polyfills.bundle.js',
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      'node_modules/promise-polyfill/promise.min.js',
      'js/jquery.min.js',
      'node_modules/jquery-cycle/index.js',
      'node_modules/nunjucks/browser/nunjucks.js',
      'node_modules/d3/build/d3.js',
      'node_modules/gsap/src/minified/utils/Draggable.min.js',
      'js/lib/ThrowPropsPlugin.js',
      'js/lib/DirectionalRotationPlugin.min.js',
      'js/lib/lazy-load.js',
      'node_modules/gsap/src/minified/plugins/CSSPlugin.min.js',
      'node_modules/gsap/src/minified/TimelineLite.min.js',
      'node_modules/gsap/src/minified/TimelineMax.min.js',
      'node_modules/gsap/src/minified/TweenMax.min.js',
      'node_modules/gsap/src/minified/TweenLite.min.js',
      'js/helper-functions.js',
      'js/app.js'
    ],  
    jsDest = 'compiled/js';

gulp.task('bundle', function() {
  return gulp.src('js/lib/polyfills.js')
  .pipe(browserify({ transform: ['babelify'] }))
        .pipe(rename('polyfills.bundle.js'))
        .pipe(gulp.dest('js/lib/'));
})

gulp.task('scripts', ['bundle'], function() {  
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(uglify().on('error', function(e){
         console.log(e);
        }))
        .pipe(gulp.dest(jsDest))
})

gulp.task('rev', function() {
  return gulp.src(['compiled/js/**/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('../dist/assets'))
    .pipe(rev.manifest()) 
    .pipe(gulp.dest('../dist'))    
    .pipe(revDel({ dest: '../dist/assets', force: true }));
})

gulp.task("revreplaceSW", ['rev'], function(){  
var manifest = gulp.src("../dist/rev-manifest.json");

return gulp.src("compiled/sw.js")
  .pipe(revReplace({manifest: manifest}))
  .pipe(gulp.dest("../"));
})

gulp.task("revreplaceAppjs", function(){  
var manifest = gulp.src("../dist/rev-manifest.json");

return gulp.src("compiled/js/**/*.js")
  .pipe(revReplace({manifest: manifest}))
  .pipe(gulp.dest("compiled/js/"));
})

gulp.task('copy-assets', ['sass'], function() {
  return gulp.src(['compiled/css/**/*.css'])
    .pipe(revReplace())
    .pipe(gulp.dest('../dist/assets'))
})

gulp.task("revreplace", ["copy-assets"], function(){
  var manifest = gulp.src("../dist/rev-manifest.json");

return gulp.src("../dist/index.html")
  .pipe(revReplace({manifest: manifest}))
  .pipe(dom(function(){
      var imgEl = this.getElementsByTagName('img');
      var parent = this;
      for(var i=0;i<imgEl.length;i++){
        var item = imgEl[i];
        item.classList.add("js-lazy-image");
      }
    return this;
  }))
  .pipe(replace('src="http', 'src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABs1BMVEUAAADZ2dnn5+fu7u7W1tbv7+/h4eHs7Oza2trg4ODp6enc3Nzr6+vo6Ojk5OTb3Nza29v////g4uSn2fOo2/cAmv+p0uqr3vur2/Wp0+uq3v2t3/qm0u226/6p2faw5P2m0eat4Pyr3vmq2PGq3/2s3vmu4fqu4fze3t7l5eXr6+vv7+/u7u7T09Pb29vt7e3s7Ozg4ODl5eXh4eHc3Nzs7Ozs7Ozs7Ozs7Oze3t7m5ubt7e3u7u7u7u7c3Nzv7+/u7u7b29vg4ODq6urr6+vc3Nze3t7f39/e39/e3d3h4eHk5OXj4+Pg4ODf39/i4uLk5OTd3t7f39+93O7Q3eTh3dvb3Nzb3N2l1/Or3/qo2/io2var3vmq3Pir3fis3/qp2fWq2/Wv4/yr3vmr3fmBoLes3/qs3/qq3Pat4Pqr3fis3vmm0uis3/qq3Pis3/mt4Pur3fis3vmr3vms3vml0+6p2PGt4fur3fmr3fiu4vys3vms3vmt4fus4Pup2fSt4Pmu4fzk5OTr6+vj4+Pn5+fq6uro6Ojl5eXt7e3u7u7s7Ozw8PDp6eng4ODe3t7///9ZInuTAAAAgnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATNf0nBILu/xpBjyK8tqFRgpV7/WVDoT7Y1T2/nQJa7zV3uHXwaqNXBIJFU8rFQsCCjMZI0QZGTUZCwwWRQE9GhsZMyIBRxQlEDUXGkMFAyUZMgk/Gw86FCAIRb6QlwAAAAFiS0dEEeK1PboAAAAHdElNRQfhCgUIIRYa+nseAAAA0ElEQVQY02NgYGBgZNLQ1NLWYWaAARZdvaZmfQNWJgiXzdDI2KSltc3UzNyCHaSezdKqvaO1ubOr29rGFqiNg9Ouqb2pqbunq7fZ3oGVi4GD29Gpqa+/vbOtpcnZhYeXgYHb1c3dw9PL28fXzz+AD2Qqv0BgUHBIaFi4oBDMXuGIyKhoEVG4O8TEY2Lj4hMSJWACklJJySmpaenScCUyshmZWdly8nABhZzcvPwCRThfUqmwqLiktEwZLqBSXlFZVV2jClfCoFZbV9/QqA5iAgBdVTBaRMEfhgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMC0wNVQwODozMzoyMiswMjowMFf7V28AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTAtMDVUMDg6MzM6MjIrMDI6MDAmpu/TAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC" data-src="http'))
  .pipe(replace('srcset="http', 'data-srcset="http'))
  .pipe(replace('src="http:', 'src="https:'))
  .pipe(replace('sizes="', 'data-sizes="'))
  .pipe(replace('target="_blank"', 'target="_blank" rel="noopener"'))
  .pipe(gulp.dest("../"));
})

gulp.task("revreplace-dev", ["rev"], function(){
  return gulp.src("../dist/dev.html")
  .pipe(dom(function(){
      var imgEl = this.getElementsByTagName('img');
      var parent = this;
      for(var i=0;i<imgEl.length;i++){
        var item = imgEl[i];
        item.classList.add("js-lazy-image");
      }
    return this;
  }))
  .pipe(replace('src="http', 'data-src="http'))
  .pipe(replace('srcset="http', 'data-srcset="http'))
  .pipe(gulp.dest("../"));
})

gulp.task('json:minify', function() {
  return gulp.src(['../dist/proxy/data.json'])
    .pipe(jsonmin())
    .pipe(gulp.dest('../dist/proxy/'));
    //.on('error', util.log);
});

gulp.task('nunjucks', function() {

  var path = '../dist/proxy/data.json';
  var jsondata = JSON.parse(fs.readFileSync(path, 'utf8'));
  var posts = [];
  var info = [];
  var i;
  var k;
  for(i = 0;i<jsondata.length;i++) {
    var post = jsondata[i];
    if(post.id !==321) {
       posts.push(post);
    }
  }  

  for(k = 0;k<jsondata.length;k++) {
    var info_post = jsondata[k];
    if(info_post.id === 321) {
       info.push(info_post);
    }
  }

  // Gets .html and .nunjucks files in pages
  return gulp.src('js/pages/**/*.+(html|nunjucks)')
  .pipe(nunjucksRender({
      data: {
        post_content: posts,
        info_content: info
      },
      envOptions: {
        autoescape: false
      },
      path: ['js/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('../dist/'))
});

//Manage svg files:
// 1. Gathers the files in the src/svg directory and creates
// a sprite.svg and a _sprite.scss
gulp.task('sprites', function () {
  return gulp.src('../src/svg/*.svg')
    .pipe(svgSprite({
      cssFile: "_sprite.scss",
      svg: {
        sprite: "svg/sprite-v1.svg"
      }
    }))
    .pipe(gulp.dest("../src/scss/common/"));
})

// 2. The sprite.svg gets copied first in the compiled (for development) and then in the dist/svg folder (for production) (the scss get compiled into app.css)
gulp.task('copy-svg', ['sprites'], function() {
  return gulp.src(['scss/common/svg/*.svg'])
    .pipe(revReplace())
    .pipe(gulp.dest('compiled/svg'))
    .pipe(revReplace())
    .pipe(gulp.dest('../dist/svg'))
    ;
})

// Generate & Inline Critical-path CSS
gulp.task('critical-css', function () {
  return gulp.src('../index.html')
    .pipe(critical({base: './', inline: true, minify: true, css: ['../dist/assets/app.css'], include: ['#preloader', '#preloader svg', '.visually-hidden', '.donut', '.wave', '#ocean']}))
    .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
    .pipe(gulp.dest('../'));
})

gulp.task('compress', function() {
    gulp.src('../dist/assets/*.css')
  .pipe(gzip(config))
  .pipe(gulp.dest('../dist/assets/'));
})

gulp.task('minify', function() {
  return gulp.src('../index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../'));
});

gulp.task('lint', function() {
  return gulp.src('js/app.js')
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'));
});


gulp.task('watch', ['sass', 'scripts', 'nunjucks', 'revreplace-dev', 'sprites', 'copy-assets'], function(){
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['scripts']); 
  gulp.watch('js/**/*.+(html|nunjucks)', ['nunjucks']); 
  gulp.watch('../dist/dev.html', ['revreplace-dev']);
  gulp.watch('../src/svg/*.svg', ['sprites', 'copy-svg']);
})

gulp.task('build', function(callback) {
  runSequence(
    'sass',
    'autoprefixer',
    'scripts',
    'revreplaceSW',
    'revreplaceAppjs',
    'copy-assets',
    'revreplace',
    'json:minify',
    'nunjucks',
    'sprites',
    'copy-svg',
    'critical-css',
    'minify',
    callback
  )
})
 


 