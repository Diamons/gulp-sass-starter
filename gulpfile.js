// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    appDefaults = {
      stylesDir : "styles/" // path to styles
    }

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Styles
gulp.task('styles', function() {
  return gulp.src(appDefaults.stylesDir+'**/*.scss')
    .pipe(sass({ style: 'compressed'  }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(appDefaults.stylesDir))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(appDefaults.stylesDir))
    .pipe(browserSync.stream())
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('fileinclude', function() {
  gulp.src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

// Watch
gulp.task('watch', ['fileinclude'], function() {
  browserSync.init({
    server: "./"
  });
  // Watch .scss files
  gulp.watch(appDefaults.stylesDir+'**/*.scss', ['styles']);
  gulp.watch(['./src/**/*.html'], ['fileinclude']);
  gulp.watch(['./*.js']).on('change', browserSync.reload);

});


// Default task
gulp.task('default', function() {

});