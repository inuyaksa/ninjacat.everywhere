//####==-- Ninja Cat Everywhere
//####==-- https://github.com/inuyaksa/ninjacat.everywhere 
//####==-- minijy js and generate map

var gulp = require('gulp');
var minify = require('gulp-minify');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var header = require('gulp-header');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var replace = require('gulp-replace');
var umd = require('gulp-umd');

var pkg = require('./package.json');
 
var minibanner = '/* <%= pkg.name %> @version v<%= pkg.version %> @link <%= pkg.homepage %> @license <%= pkg.license %> */ ';

gulp.task('compress', function() {

  gulp.src('./src/*.js')
    .pipe(replace('{@version}',pkg.version))    
//    .pipe(umd({ templateName: 'amdCommonWeb' }))
    .pipe(gulp.dest('dist'));

  gulp.src('./src/*.css')
    .pipe(replace('{@version}',pkg.version))
    .pipe(gulp.dest('dist'));

  gulp.src('./src/*.js')
    .pipe(header(minibanner, { pkg : pkg } ))
    .pipe(sourcemaps.init())
    .pipe(minify({
        noSource: true,
        preserveComments: "some",
        ext:{
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.min.js']
    }))
    .pipe(sourcemaps.write('.'))    
    .pipe(gulp.dest('dist'));

    gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleancss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));

});

gulp.task('watch', function(){
  gulp.watch('src/*.js', ['compress']);
});