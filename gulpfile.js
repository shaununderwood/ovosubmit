var gulp = require('gulp'),
  sass = require('gulp-sass'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  karmaServer = require('karma').Server,
  ngHtml2Js = require("gulp-ng-html2js"),
  template = require('gulp-template'),
  path = require('path'),
  sourcemaps = require('gulp-sourcemaps'),
  ngConstant = require('gulp-ng-constant'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  plato = require('plato');

var styleFiles = [
  //vendor
  'src/vendors/normalize.css/normalize.css',
  //project
  'src/*.scss',
  'src/**/*.scss'
];

var vendorScripts = [
  'vendors/jquery/dist/jquery.min.js',
  'vendors/jquery-ui/jquery-ui.min.js',
  'vendors/angular/angular.min.js',
  'vendors/angular-route/angular-route.min.js',
  'vendors/angular-messages/angular-messages.min.js',
  'vendors/angular-sanitize/angular-sanitize.min.js',
  'vendors/angular-translate/angular-translate.min.js',
  'vendors/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
  'vendors/angular-resource/angular-resource.min.js',
  'vendors/angular-datepicker/dist/angular-datepicker.min.js',
  'vendors/angular-animate/angular-animate.min.js',
  'vendors/moment/min/moment.min.js',
  'vendors/moment-timezone/builds/moment-timezone-with-data-2010-2020.min.js',
  'vendors/lodash/lodash.min.js',
  'vendors/ngprogress/build/ngProgress.min.js',
  'vendors/tether/tether.min.js',
  'vendors/shepherd/shepherd.min.js',
  'vendors/checkit-ng-lb-services/js/lb-services.js',
  'vendors/svg4everybody/dist/svg4everybody.min.js',
  'vendors/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
  'vendors/drag-drop-webkit-mobile/ios-drag-drop.js',
  'vendors/ng-csv/build/ng-csv.js'
];

var vendorMaps = [
  'vendors/angular-sanitize/angular-sanitize.min.js.map',
  'vendors/angular-resource/angular-resource.min.js.map',
  'vendors/angular-animate/angular-animate.min.js.map'
];

var uglifyDefaults = {mangle:false, compress: {
	sequences: true,
	dead_code: true,
	conditionals: true,
	booleans: true,
	unused: true,
	if_return: true,
	join_vars: true,
	drop_console: true
}};

// Styles
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

gulp.task('tests', ['config'], function(done) {
  new karmaServer({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['src/**/*.module.js', 'src/**/*.js', '!src/config/**/*.*'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.min.js'))
    //.pipe(ngAnnotate()) //turned off as we are not using mangle just now since it causes problems with the checklists module
    .pipe(uglify(uglifyDefaults))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts-pretty', ['config'],function() {
  return gulp.src(['src/**/*.module.js', 'src/**/*.js'], { base: 'src' })
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(livereload());
});

gulp.task('assemble', ['config'], function(){
  var mainJsFile;

  return gulp.src(['dist/scripts/main.min*js', 'src/config/**/*.js'], { base: 'src' })
    .on('data', function(file) {
      if (!mainJsFile) {
        mainJsFile = file.path;
      }
    })
    .pipe(concat('main.min.tmp.js'))
    .on('data', function(file) {
      file.path = mainJsFile;
    })
    .pipe(gulp.dest('scripts'));
});

gulp.task('config', function() {
  return gulp.src('src/config/config.module.json')
    .pipe(ngConstant({
        constants: {
          WebUiConfig: {
            url: process.env.API_URL || '',
            version: require('./package.json').version,
            oauth2AuthEndpoint: process.env.OAUTH2_AUTH_ENDPOINT || '',
            oauth2TokenEndpoint: process.env.OAUTH2_TOKEN_ENDPOINT || '',
            oauth2LogoutEndpoint: process.env.OAUTH2_LOGOUT_ENDPOINT || '',
            oauth2ClientId: process.env.OAUTH2_CLIENT_ID || 'checkit-webui'
          }
        }
    }))
    .pipe(uglify(uglifyDefaults))
    .pipe(gulp.dest('src/config/'))
    .pipe(livereload());
});

// HTML
gulp.task('html', function() {
  return gulp.src(['src/**/*.html', '!src/**/*tpl.html'])
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('html2js', function() {
  return gulp.src("./src/**/*.tpl.html")
    .pipe(template())
    .pipe(ngHtml2Js({
      moduleName: function(file) {
        var currentPath = __dirname;
        if (file.path.indexOf(currentPath) === -1) {
          return 'templates';
        }
        //Get the relative path and return the root directory inside the src directory
        var relativePath = file.path.slice(currentPath.length, file.path.length);
        var split = relativePath.split(path.sep);
        return split[2];
      }
    }))
    .pipe(concat("templates.js"))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(livereload());
});

// HTML
gulp.task('translations', function() {
  return gulp.src('translations/*')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(livereload());
});

gulp.task('vendor', function() {
  return gulp.src(vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(uglify(uglifyDefaults))
    .pipe(gulp.dest('dist/vendors/'))
    .pipe(livereload());
});

gulp.task('vendorMaps', function() {
  return gulp.src(vendorMaps)
    .pipe(uglify(uglifyDefaults))
    .pipe(gulp.dest('dist/vendors/'))
    .pipe(livereload());
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('cleanVendor', function() {
  return gulp.src(['vendor'], {
      read: false
    })
    .pipe(clean());
});

gulp.task('images', function() {
  return gulp.src(['assets/img/*'])
    .pipe(gulp.dest('dist/img/'))
    .pipe(livereload());
});

gulp.task('icons', function(){
  return gulp
    .src(['assets/icons/**'])
    .pipe(gulp.dest('dist/icons/'))
    .pipe(livereload());
});

gulp.task('fonts', function() {
  return gulp.src(['vendors/components-font-awesome/fonts/*', 'assets/fonts/**'])
    .pipe(gulp.dest('dist/fonts/'))
    .pipe(livereload());
});

// Default task
gulp.task('default', ['build-pretty'], function() {
  gulp.start('build-pretty');
});

gulp.task('build', ['clean', 'tests'], function() {
  gulp.start('revreplace', 'html', 'html2js', 'vendor', 'vendorMaps', 'images', 'fonts', 'icons', 'translations');
});

gulp.task('build-pretty', ['clean'], function() {
  gulp.start('scripts-pretty', 'styles', 'html', 'html2js', 'vendor', 'vendorMaps', 'images', 'fonts', 'icons', 'translations');
});

// Watch
gulp.task('watch', function() {
  livereload.listen();

  gulp.start('build-pretty');

  // Watch .scss files
  gulp.watch('src/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(['src/**/*.js'], ['scripts-pretty']);

  // Watch .html files
  gulp.watch(['src/**/*.html', '!src/**/*tpl.html'], ['html']);

  // Watch template files
  gulp.watch(['src/**/*tpl.html'], ['html2js']);

  gulp.watch('assets/img/*', ['images']);

  //watch translations
  gulp.watch('translations/*', ['translations']);

});

var distFolder = 'dist';
gulp.task("revision", ["styles", "scripts"], function(){
  return gulp.src(["dist/**/*.css", "dist/**/*.js"])
    .pipe(rev())
    .pipe(gulp.dest(distFolder))
    .pipe(rev.manifest())
    .pipe(gulp.dest(distFolder))
});

gulp.task("revreplace", ["revision"], function(){
  var manifest = gulp.src("./" + distFolder + "/rev-manifest.json");

  gulp.src(['dist/scripts/main.min.js'], {
    read: false
  }).pipe(clean());

  return gulp.src("src/index.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(distFolder));
});

gulp.task('plato', [], function(done) {
  var files = ['src/**/*.js'];

  var outputDir = './report';

  var options = {};

  var callback = function (report){
    done();
  };

  plato.inspect(files, outputDir, options, callback);
});