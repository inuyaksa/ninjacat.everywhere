//####==-- Ninja Cat Everywhere
//####==-- https://github.com/inuyaksa/ninjacat.everywhere 
//####==-- minijy js and generate map

var gulp = require('gulp');
var minify = require('gulp-minify');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var header = require('gulp-header');
var rename = require('gulp-rename');

var pkg = require('./package.json');
 
var minibanner = '/* <%= pkg.name %> @version v<%= pkg.version %> @link <%= pkg.homepage %> @license <%= pkg.license %> */ ';

gulp.task('compress', function() {

  gulp.src('src/*.js')
    
    .pipe(sourcemaps.init())
    .pipe(minify({
        ext:{
            min:'-min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['-min.js']
    }))
    .pipe(sourcemaps.write('.'))
//    .pipe(header(minibanner, { pkg : pkg } ))  // NOT WORK - I DUNNO
    .pipe(gulp.dest('dist'));

});

gulp.task('watch', function(){
  gulp.watch('src/*.js', ['compress']);
});