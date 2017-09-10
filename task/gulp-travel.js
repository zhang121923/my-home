var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var autoPerfixer = require('gulp-autoprefixer');

var src_path = {
    'sass': ['sass/travel/*.scss']
};

var dest_path = {
    'css': 'app/css/travel'
};

gulp.task('gulp-travel', ['travel-watch'], function () {

});

gulp.task('travel-watch', function () {
    gulp.watch(src_path.sass, ['travel-sass']);
});

gulp.task('travel-sass', false, function (done) {
    gulp.src(src_path.sass)
        .pipe(sass())
        .on('error',sass.logError)
        .pipe(autoPerfixer({browsers:['last 2 versions']}))
        .pipe(minify())
        .pipe(gulp.dest(dest_path.css))
        .on('end',done)
});