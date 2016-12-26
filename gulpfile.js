var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
sass = require('gulp-sass'),
watch = require('gulp-watch'),
babel = require('gulp-babel'),
px2rem = require('gulp-px2rem'),
uglify = require('gulp-uglify'),
cssmin = require('gulp-minify-css'),
clean = require('gulp-clean');

gulp.task('browser-sync', ['sass2css', 'es62es5'], function(){
  browserSync.init({
    server:{
    	baseDir:'./demo'
    }
  });

  gulp.watch('./src/*.scss', [ 'sass2css' ]);
  gulp.watch('./src/*.js', [ 'es62es5' ]);

  gulp.watch('./demo/index.html').on('change', reload);
});

gulp.task('sass2css', function(){
  return gulp.src('./src/mslider.scss')
      .pipe( sass() )
      .pipe( 
        px2rem({ replace: true, rootValue: 64 }, { map: true })
      )
      .pipe( cssmin() )
      .pipe( gulp.dest( './demo' ) )
      .pipe( browserSync.stream() );
});

gulp.task('es62es5', function(){
	return gulp.src('./src/mslider.js')
    	.pipe( babel() )
      .pipe( uglify() )
    	.pipe(gulp.dest( './demo' ))
      .pipe( browserSync.stream() );
});

gulp.task('clean-css', function (){
  return gulp.src('demo/*.css', {read: false})
      .pipe(clean());
});

gulp.task('clean-scripts', function (){
  return gulp.src('demo/*.js', {read: false})
      .pipe(clean());
});