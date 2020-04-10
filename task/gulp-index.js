var gulp = require("gulp");
var sass = require("gulp-sass");
var autoPrefixer = require("gulp-autoprefixer");
var gulpError = require("gulp-error");
var minify = require("gulp-minify-css");

var src_path = {
    "sass": ["sass/*.scss"],
    // "js": ["js/index.js"]
};

var dest_path = {
    "sass": "app/css/index",
    // "js": [""]
};


gulp.task('gulp_index',["index_watch"],function(){

});

gulp.task("index_watch",function(){
    gulp.watch(src_path.sass,["index_sass"]);
});

gulp.task("index_sass",false,function(done){
    gulp.src(src_path.sass)
        .pipe(sass())
        .on("error",sass.logError)
        .pipe(autoPrefixer({ browsers: ['last 2 versions'] }))
        .pipe(minify())
        .pipe(gulp.dest(dest_path.sass))
        .on('end',done)
});
