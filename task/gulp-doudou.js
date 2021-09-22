var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var autoPerfixer = require('gulp-autoprefixer');

var src_path = {
    'sass': ['sass/doudou/*.scss']
};

var dest_path = {
    'css': 'app/css/doudou'
};

gulp.task('gulp-doudou', ['doudou-watch'], function () {

});

gulp.task('doudou-watch', function () {
    gulp.watch(src_path.sass, ['doudou-sass']);
});

gulp.task('doudou-sass', false, function (done) {
    gulp.src(src_path.sass)
        .pipe(sass())
        .on('error',sass.logError)
        .pipe(autoPerfixer({browsers:['last 2 versions']}))
        .pipe(minify())
        .pipe(gulp.dest(dest_path.css))
        .on('end',done)
});
