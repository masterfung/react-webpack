var gulp = require('gulp')
  , path = require('path')

var $ = require('gulp-load-plugins')({
  scope: ['devDependencies'],
  camelize: true,
  lazy: true
})

const ROOT = path.join(__dirname)
  , APP = path.join(ROOT)
  , DIST = path.join(APP, 'dist')
  , FILES = {
    entry: path.join(APP, 'src', 'entry.es6'),
    index: path.join(DIST, 'index.html')
  }

gulp.task('scripts:build', function(){
  return gulp.src(FILES.entry)
    .pipe($.webpack({
      output: {
        filename: '[name].js'
      },
      devtool: 'source-map',
      target: 'web',
      watch: true,
      resolve: {
        extensions: ['', '.es6', '.js']
      },
      module: {
        loaders: [
          {
            test: /\.es6$/, // looking for es6 extension
            exclude: /node_modules/,
            loaders: [ 'babel' ]
            // with all experimental options
            // ,loaders: [ 'babel?experimental&optional=runtime&playground' ]
          }
        ]
      },
      plugins: [
        // these are too slow for a watch
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.optimize.DedupePlugin(),
      ]
    }))
    .pipe(gulp.dest(DIST))
    .pipe($.connect.reload()) // can swap for browserSync
})

gulp.task('reload:html', function(){
  return gulp.src(FILES.index)
    .pipe($.connect.reload())
})

gulp.task('connect:start', function(){
  $.connect.server({
    root: DIST,
    livereload: true
  })
  return gulp.src(FILES.index)
    .pipe($.open('',{
      url: 'http://localhost:8080'
    }))
});

gulp.task('watch:html', function(){
  return gulp.watch(FILES.index, ['reload:html'])
});

gulp.task('dev', ['connect:start', 'watch:html', 'scripts:build'])

gulp.task('default', $.taskListing)