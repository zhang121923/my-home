var gulp = require("gulp-help")(require("gulp"))
var src = require('require-dir');
var browserSync = require('browser-sync').create();

var dir = src("./task");

gulp.task('server', '进入所有gulp任务', ["index", "production", "travel"], function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./",
        },
        ghostMode: false
    });
    gulp.watch(['./app/**', './sass/**', './index.html']).on('change', browserSync.reload);
});

gulp.task('index', ["gulp_index"], function () {

});

gulp.task('production', ["gulp-production"], function () {

});

gulp.task('travel', ["gulp-travel"], function () {

});
