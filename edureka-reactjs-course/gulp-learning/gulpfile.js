var gulp = require('gulp');
var del = require('del');

gulp.task('default',  gulp.series(clean, copyIndex,copyAppJs,copyVendor,watchAppJs));

function clean(done) {
    del(['dist']);
    done(); 
}

function copyIndex(done) {
    return gulp.src('./client/index.html').pipe(gulp.dest('./dist', {overwrite: true}));
}

function copyAppJs(done) {
    return gulp.src('./client/**/*.js').pipe(gulp.dest('./dist', {overwrite: true}));
    done();
}

function copyVendor(done) {
    var vendor_files = ['./node_modules/angular/angular.js'];
    return gulp.src(vendor_files).pipe(gulp.dest('./dist/vendor', {overwrite: true}));
}

function watchAppJs(done) {
    return gulp.watch('./client/**/*.*', gulp.series(clean, copyIndex, copyAppJs, copyVendor));
}gulp.task('watch', gulp.series(watchAppJs));