var gulp = require("gulp-help")(require("gulp"))
var src = require('require-dir');

var dir = src("./task");

gulp.task('default','进入所有gulp任务',["index","production","travel"],function(){

});

gulp.task('index',["gulp_index"],function(){

});

gulp.task('production',["gulp-production"],function(){

});

gulp.task('travel',["gulp-travel"],function(){

});