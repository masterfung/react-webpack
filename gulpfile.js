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

gulp.task('scripts:build', function(){
  return gulp.src(APP + "/src/entry.es6")
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
  return gulp.src(DIST + "/index.html")
    .pipe($.connect.reload())
})

gulp.task('connect:start', function(){
  $.connect.server({
    root: DIST,
    livereload: true
  })
  return gulp.src(DIST + "/index.html")
    .pipe($.open('',{
      url: 'http://localhost:8080'
    }))
});

gulp.task('watch:html', function(){
  return gulp.watch(DIST + "/index.html", ['reload:html'])
});

gulp.task('dev', ['connect:start', 'watch:html', 'scripts:build'])

gulp.task('default', $.taskListing)