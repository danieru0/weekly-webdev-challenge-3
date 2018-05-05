var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
    browserSync({
        server: './'
    })
    
    gulp.watch('./*.html', ['reload']);
    gulp.watch('./scss/**/*.scss', ['sass']).on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		 }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
})

gulp.task('default', ['serve']);