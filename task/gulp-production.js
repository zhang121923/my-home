var gulp = require("gulp");
var sass = require("gulp-sass");
var minify = require("gulp-minify-css");
var autoPrefixer = require("gulp-autoprefixer");

var src_path ={
    "sass": ['sass/production/*.scss']
};

var dest_path = {
    "sass": "app/css/production"
};

gulp.task("gulp-production",['pro-watch'],function(){

});

gulp.task('pro-watch',false,function(){
    gulp.watch(src_path.sass,["pro-sass"])
});

gulp.task('pro-sass',false,function(done){
    gulp.src(src_path.sass)
        .pipe(sass())
        .on('error',sass.logError)
        .pipe(autoPrefixer({browsers:['last 2 versions']}))
        .pipe(minify())
        .pipe(gulp.dest(dest_path.sass))
        .on('end',done)
});