// Karma configuration
// Generated on Sun Jan 03 2016 15:26:10 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
      //'karma-coverage',
      //'karma-junit-reporter'
    ],


    // list of files / patterns to load in the browser
    files: [
        'src/vendors/jquery/dist/jquery.js'
      , 'src/vendors/angular/angular.js'
      , 'src/vendors/angular-mocks/angular-mocks.js'
      , 'tests/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};

var styleFiles = [
    //vendor
    'vendors/sanitize-css/dist/sanitize.css'
  , 'vendors/bootstrap-sass/assets/stylesheets/_bootstrap.scss'
    //project
  , 'src/*.scss'
  , 'src/**/*.scss'
];

gulp.task('styles', function() {
  return gulp.src(styleFiles)
    .pipe(sass({
      style: 'expanded'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(livereload());
});
