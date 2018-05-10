# @vslutov/[gulp](http://gulpjs.com)-po2json

> Convert .po files to JSON using [po2json](https://github.com/mikeedwards/po2json)

## Install

Install with [npm](https://npmjs.org/package/@vslutov/gulp-po2json)

```
npm install --save-dev @vslutov/gulp-po2json po2json
```

## Examples

```
var gulp = require('gulp');
var po2json = require('@vslutov/gulp-po2json');

gulp.task('po2json', function () {
    return gulp.src(['po/**/*.po'])
        .pipe(po2json())
        .pipe(gulp.dest('dist/translations/'));
});
```
