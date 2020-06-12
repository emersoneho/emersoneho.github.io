const {
  src,
  dest,
  series,
  parallel,
  watch,
} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const del = require('del');

const path = {
  dev: 'app',
  dist: 'dist'
}

const production = 0;

async function clean() {
  return del([
    `${path.dist}/assets/css`,
    `${path.dist}/assets/js`,
  ]);
}

async function cssTranspile() {
  return src(`${path.dev}/assets/scss/*.scss`)
    .pipe(sass())
    .pipe(dest(`${path.dev}/assets/css`))
}

async function cssMinify() {
  let aux = production == 0 ? path.dev : path.dist;
  return src(`${path.dev}/**/*.css`)
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(dest(`${aux}`));
}

async function jsMinify() {
  let aux = production == 0 ? path.dev : path.dist;

  return src(`${path.dev}/**/*.js`)
    .pipe(babel())
    .pipe(src('vendor/*.js'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(dest(`${aux}`));
}

async function jsConcatFiles() {
  return src(`${path.dev}/**/*min.js`)
    .pipe(concat('app.js'))
    .pipe(dest(`${path.dist}/`));
}

async function cssConcatFiles() {
  return src(`${path.dev}/assets/css/*.min.css`)
    .pipe(concat('app.css'))
    .pipe(dest(`${path.dist}`));
}

async function copyFiles() {

}

async function imagesToWebp() {
  src(`${path.dev}/assets/img/*.*`)
    .pipe(webp())
    .pipe(dest(`${path.dist}/assets/img/`))
}

async function watchFiles() {
  watch([`${path.dev}/assets/scss/*.scss`], series(cssTranspile))
}

exports.minify = parallel(
  jsMinify, cssMinify
);

exports.default = watchFiles

exports.publish = series(
  clean,
  parallel(
    cssTranspile,
    series(jsMinify)
  ),
  parallel(cssMinify),
  imagesToWebp,
);


exports.teste = async () => {
  console.log(123);
  
} 