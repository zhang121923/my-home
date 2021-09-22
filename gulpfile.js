var gulp = require('gulp-help')(require('gulp'))
var src = require('require-dir');
var browserSync = require('browser-sync').create();
var addVersion = require('./build/suffixVersion.js');

var dir = src('./task');

gulp.task('server', '进入所有gulp任务', ['gulp_index', 'gulp-production', 'gulp-travel', 'gulp-doudou', 'addVersion'], function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './',
        },
        ghostMode: false
    });
    gulp.watch(['./app/**', './sass/**', './index.html', './childPage/**']).on('change', browserSync.reload);
});

//添加版本号
gulp.task('addVersion', function () {
    return gulp.src('./index.html')
        .pipe(addVersion())
        .pipe(gulp.dest('./'))
});

// 打包，加版本号
gulp.task('build', ['addVersion']);