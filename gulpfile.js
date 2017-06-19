const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

gulp.task('default', ['js', 'css', 'watch'])

gulp.task('js', () => {
  return gulp.src('src/js/app.js')
             .pipe(babel({
               presets: ['es2015']
             }))
             .pipe(gulp.dest('public/js'))
})

gulp.task('css', () => {
  return gulp.src('src/sass/app.scss')
             .pipe(sass())
             .pipe(gulp.dest('public/css'))
})

gulp.task('uglify', () => {
  return gulp.src('src/js/app.js')
             .pipe(babel({
               presets: ['es2015']
             }))
             .pipe(uglify())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('public/js'))
})

gulp.task('minify-css', () => {
  return gulp.src('src/sass/app.scss')
             .pipe(sass())
             .pipe(cleanCSS())
             .pipe(rename({
               suffix: '.min'
             }))
             .pipe(gulp.dest('public/css'));
})

gulp.task('prod', ['uglify', 'minify-css'])

gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['js'])
  gulp.watch('src/sass/**/*.scss', ['css'])
})
