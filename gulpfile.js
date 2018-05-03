var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	htmlReplace = require('gulp-html-replace'),
	htmlMin = require('gulp-htmlmin'),
	uglify = require('gulp-uglify');

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

gulp.task('html', function() {
	return gulp.src('./*.html')
		.pipe(htmlReplace({
			'css': 'css/style.css',
			'js': 'js/script.js'
		}))
		.pipe(htmlMin({
			sortAttributes: true,
			sortClassName: false,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist/'))
});

gulp.task('css', function() {
	return gulp.src('./*.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	return gulp.src('./js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['serve']);