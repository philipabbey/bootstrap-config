console.time("Loading plugins"); //start measuring
var bootstrapConfig = require('../index.js');
var path = require('path');
console.timeEnd('Loading plugins');

/*
Ideally, a test would:

 1. Check variables.less created here against node_modules/bootstrap/less/variables.less
    *  npm install gulp-customize-bootstrap
 2. Check less compilation succeded:
    *  npm install gulp-less
    a. Should be an empty variables.css file as variables produce no CSS
    b. Should be no errors from less.

Practically this is not proving easy as basic UNIX commands like sed, grep & sort for stripping
comments and manipulating text files are not available in npm or gulp. Event the ones that
perport to provide the functions are not actually working. ('gulp-delete-lines' does not strip
comments from the ends of lines, 'strip-comments' & 'gulp-strip-comments' seem to do nothing,
perhaps for .less files? No 'sort' equivalent.)

The only test here relies on showing a working example for manual verification. It has the same
number of useful lines of content as node_modules/bootstrap/less/variables.less after compilation.
*/

process.chdir(path.basename(__dirname));
bootstrapConfig('./config.json', './variables.less');
