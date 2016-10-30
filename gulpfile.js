var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
livereload = require('gulp-livereload');

var config = {
  entryFile: './src/app.js',
  outputDir: './dist/',
  outputFile: 'app.js'
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir + "/**/*", cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(config.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('copy-models', function () {
    gulp.src(
        [
            'src/models/**/*'
        ],
        {
            base: 'src/models'
        }
    )
    .pipe(gulp.dest('dist/models'));
});

gulp.task('copy-kernels', function () {
    console.log("copy kernels");
    gulp.src(
        [
            'src/kernels/**/*'
        ],
        {
            base: 'src/kernels'
        }
    )
    .pipe(gulp.dest('dist/kernels'));
});


gulp.task('build-persistent', ['clean', 'copy-kernels'], function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
});

gulp.task('watch', ['build-persistent', 'copy-models'], function() {

  browserSync({
    server: {
      baseDir: './'
    }
  });

  livereload({ start: true });
  gulp.watch('src/kernels/*.glsl', ['copy-kernels']);

  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});
