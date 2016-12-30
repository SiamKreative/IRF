var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
	browserSync.init({
		server: './dist'
	});
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src('app/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

// Copy files
gulp.task('copy', function () {
	gulp.src([
			'./app/data/**',
			'./app/img/**',
			'./app/CNAME'
		], {
			base: './app'
		})
		.pipe(gulp.dest('dist'));
});

// Minify Scripts
gulp.task('minScripts', function () {
	return gulp.src('app/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});


// Minify HTML
gulp.task('minHTML', function () {
	return gulp.src('app/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy', 'minScripts', 'minHTML', 'serve']);