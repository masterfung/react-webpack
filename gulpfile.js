var gulp = require('gulp')
  , path = require('path')
  , del = require('del')

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
    index: path.join(APP, 'src', 'index.html'),
    serveHTML: path.join(DIST, 'index.html')
  }

gulp.task('clean', function(done){
  del([ DIST ], done)
})

gulp.task('copy:html', function(){
  gulp.src(FILES.index)
    .pipe(gulp.dest(DIST))
    .pipe($.connect.reload())
})

gulp.task('bower', function() {
  $.bower()
    .pipe(gulp.dest(DIST + '/vendor'))
});

gulp.task('scripts:build', function(){
  gulp.src(FILES.entry)
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

gulp.task('connect:start', function(){
  $.connect.server({
    root: DIST,
    livereload: true
  })
  gulp.src(FILES.serveHTML)
    .pipe($.open('', {
      url: 'http://localhost:8080'
    }))
});

gulp.task('watch:html', function(){
  gulp.watch(FILES.index, ['copy:html'])
});

gulp.task('dev', [
    'clean',
    'copy:html',
    'bower',
    'connect:start',
    'watch:html',
    'scripts:build'
  ])

gulp.task('default', $.taskListing)