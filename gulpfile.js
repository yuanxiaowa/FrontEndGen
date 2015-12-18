var gulp = require('gulp');
require('load-tasks-gulp')();

gulp.task('watch', function () {
    gulp.watch('app/controller/*', require('./builder/routegen')('route'));
    gulp.watch('app/schema/*', require('./builder/modelgen')('model'));
});

gulp.task('clean', function () {

});

gulp.task('default', function () {

});