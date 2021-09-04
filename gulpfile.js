var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var path = require('path');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/material-dashboard.scss',
  SCSS: './assets/scss/**/**'
};

// gulp.task('compile-scss', function() {
//   return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer())
//     .pipe(sourcemaps.write(Paths.HERE))
//     .pipe(gulp.dest(Paths.CSS));
// });

gulp.task('compile-scss', function () {
    return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write(Paths.HERE))
        .pipe(gulp.dest(Paths.CSS))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('watch', gulp.series('compile-scss', function() {

    browserSync.init({
        port: 3000,
        server: "./",
        ghostMode: false,
        notify: false
    });

    gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
    gulp.watch('./*.html').on('change', browserSync.reload);
    // gulp.watch('assets/js/**/*.js').on('change', browserSync.reload);

}));

// gulp.task('watch', function() {
//   gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
// });

gulp.task('open', function() {
  gulp.src('examples/dashboard.html')
    .pipe(open());
});

gulp.task('open-app', gulp.parallel('open', 'watch'));