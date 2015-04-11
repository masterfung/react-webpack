var gulp = require('gulp')
  , sass = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , minifycss = require('gulp-minify-css')
  , rename = require('gulp-rename')
  , path = require('path')
  , del = require('del')
  , mainBowerFiles = require('main-bower-files');

var $ = require('gulp-load-plugins')({
  scope: ['devDependencies'],
  camelize: true,
  lazy: true
})

const ROOT = path.join(__dirname)
  , APP = path.join(ROOT, 'app')
  , DIST = path.join(ROOT, 'dist')
  , FILES = {
    entry: path.join(APP, 'src', 'todo_v2.es6'),
    index: path.join(APP, 'index.html'),
    styles: path.join(APP, 'styles', '*.scss'),
    serveHTML: path.join(DIST, 'index.html')
  }


gulp.task('clean', function(done){
  del.sync([ DIST ])
  done()
})

gulp.task('copy:html', function(){
  gulp.src(FILES.index)
    .pipe(gulp.dest(DIST))
    .pipe($.connect.reload())
})

gulp.task('build:scss', function(){
  gulp.src(FILES.styles)
    .pipe(sass())
    .pipe(gulp.dest(DIST + "/styles"))
})

gulp.task('bower:files', function() {
  gulp.src(mainBowerFiles())
    .pipe($.stripCode({
      pattern: /\/\*\# sourceMapping.+\*\//
    }))
    .pipe(gulp.dest(DIST + '/vendor'))
});

gulp.task('scripts:build', function(){
  gulp.src(FILES.entry)
    .pipe($.webpack({
      output: {
        filename: '[name].js'
      },
      devtool: 'eval',
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
            // experimental: spread used widely in JSX
            // ,loaders: [
            //  'babel?experimental&optional=runtime&playground'
            //  ]
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

gulp.task('watch:styles', function(){
  gulp.watch(FILES.style, ['build:scss'])
});

gulp.task('dev', [
    'copy:html',
    'build:scss',
    'bower:files',
    'scripts:build',
    'connect:start',
    'watch:html',
    'watch:styles'
  ])

gulp.task('default', $.taskListing)
