var gulp = require('gulp');
require('load-tasks-gulp')();

// 错误处理
function errorHandler(e) {
    console.log(e);
    util.beep();
}

function getStream(src) {
    return gulp.src(src)
        .pipe(plumber({errorHandler: errorHandler}));
}

gulp.task('watch', function () {
    gulp.watch('app/controller/*', require('./builder/routegen')('route'));
    gulp.watch('app/schema/*', require('./builder/modelgen')('model'));
    gulp.watch(['app/view/*.jade', 'app/view/{user,admin}/*.jade'], require('./builder/tmpgen')());
});

gulp.task('clean', function () {

});

gulp.task('default', function () {

});