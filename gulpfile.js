var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('sass', function() {
  gulp.src('public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets'));
});

/*gulp.task('watch', function() {
  gulp.watch('public/stylesheets/*.scss', ['sass']);
});*/

gulp.task('scripts', function() {
    gulp.src('./public/build/*', {read: false})
        .pipe(clean());
    gulp.src('./public/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./public/build/'));
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch('public/stylesheets/**/*.scss', ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'watch', 'scripts']);