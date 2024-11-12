var  project    = require('./package.json'),
gulp            = require('gulp'),
wpPot           = require('gulp-wp-pot'),
clean           = require('gulp-clean'),
zip             = require('gulp-zip');

gulp.task('pot', function() {
	return gulp.src(['**/*.php', '!__*/**', '!src/**', '!assets/**', '!lib/**',])
	.pipe(wpPot({
		domain: 'directorist-announcement',
		bugReport: 'support@sovware.com',
		team: 'sovware <support@sovware.com>'
	}))
	.pipe(gulp.dest('languages/directorist-announcement.pot'));
});

gulp.task('clean', function () {
	return gulp.src('__build/*.*', { read: false })
		.pipe(clean());
});

gulp.task('zip', function () {
	return gulp.src(['**', '!__*/**', '!node_modules/**', '!src/**', '!gulpfile.js', '!.DS_Store', '!package.json', '!package-lock.json', '!todo.txt', '!sftp-config.json', '!testing.html', '!composer.json', '!composer.lock', '!phpcs.xml.dist', '!vendor/**'], { base: '..' })
		.pipe(zip(project.name + '.zip'))
		.pipe(gulp.dest('__build'));
});


gulp.task('build', gulp.series('pot', 'clean', 'zip'));