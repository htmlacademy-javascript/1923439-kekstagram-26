import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import csso from 'postcss-csso';
import htmlmin from 'gulp-html-minifier';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';

// Styles

export const styles = () => {
  return gulp.src('css/style.css', { sourcemaps: true })
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhiteSpace: true}))
    .pipe(gulp.dest('build'));
}

// Js

const js = () => {
  return gulp.src('js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

// Images

const optimizeImages = () => {
  return gulp.src('img/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('img/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
}

// WebP

const converseWebP = () => {
  return gulp.src('img/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'));
}

// svg

const svg = () => {
  return gulp.src('img/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

// sprite

const sprite = () => {
  return gulp.src('img/*.svg')
  .pipe(svgstore({
    inlinesvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img/svg'));
}

// copy

const copy = (done) => {
  gulp.src([
    'fonts/*.{woff2,woff}',
    '*.ico',
    '*.html'
  ], {
      base: '1923439-KEKSTAGRAM-26'
    })

    .pipe(gulp.dest('build'))
    done();
}

// Clean

const clean = () => {
  return del('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('css/*.css', gulp.series(styles));
  gulp.watch('js/*.js', gulp.series(js));
  gulp.watch('*.html', gulp.series(html, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    js,
    svg,
    sprite,
    converseWebP
  ),
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    js,
    svg,
    sprite,
    converseWebP
  ),
  gulp.series (
    server,
    watcher
));


// export default gulp.series(
//   html,styles, server, watcher
// );
