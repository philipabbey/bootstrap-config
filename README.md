# bootstrap-config

> NPM module to create variables.less from Bootstrap's config.json

Having customised your own build of Bootstrap (via http://getbootstrap.com/customize/) and
downloaded the results in bootstrap.zip, you will now have a file called **config.json**
from which you can return to the Bootstrap website to continue customisation.

The config.json file contains variable names and values in JSON format rather than Less
format, which you might need for writing your own Less files. The aim of this module is to
convert config.json to variables.less in order to allow you to '@import "variables.less";'
in your own less code.

There are other Bootstrap configuration modules available from npm (https://www.npmjs.com/),
but none of them produce any Less products, all skipping to the compiled CSS.

## Information

<table>
<tr>
<td>Package</td><td>bootstrap-config</td>
</tr>
<tr>
<td>Description</td>
<td>Create variables.less from Bootstrap's config.json</td>
</tr>
<tr>
<td>Bootstrap Version</td>
<td>Tested with v3.3.7</td>
</tr>
<tr>
<td>Node Version</td>
<td>Tested with v6.9.2</td>
</tr>
</table>

## Installation

```
npm install --save bootstrap-config
```

Optional, from the installation directory 'node_modules/bootstrap-config':

```
npm test
```

## Basic Usage

```
bootstrapConfig('./config.json', './variables.less');
```

```
function isExists(file) {
  fs.stat(file, function(err, stat) {
    if (err == null) {
        return true;
    } else {
        return false;
    }
  });  
}

function isFileNewer(src, dest) {
  var srcMtime = (new Date(util.inspect(fs.statSync(src).mtime))).getTime();
  if (!isExists(dest)) {
    /* Remake this target as dest is absent */
    return true;
  } else {
    var destMtime = (new Date(util.inspect(fs.statSync(dest).mtime))).getTime();
    return (srcMtime > destMtime);
  }
}

gulp.task('bootstrapVariables', function (done) {
  var src = 'dev-files/bootstrap/config.json';
  var dest = 'dev-files/bootstrap/variables.less';
  if (isFileNewer(src, dest)) {
    bootstrapConfig(src, dest);
    console.log("bootstrap-config: Updated Bootstrap variables.");
  };
  done();
});

```

## Project Less Usage

```
@import "../bootstrap/variables.less";

// Fundamental Values
@space-top: 20px;
@space-bottom: 0px;
@footer-height: 40px;
@navbar-tiny-wrap: 334px;

// Derived Values
@navbar-two-row-height: (2 * @navbar-height) + @space-top; // 120px
@navbar-one-row-height: @navbar-height + @space-top; // 70px

body {
  padding-top: @navbar-height + @space-top;
  padding-bottom: @footer-height + @space-bottom;
}

/* Fix body spacing for "Small devices" when the menu bar wraps to 2 lines */
@media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) {
  body {
    padding-top: @navbar-two-row-height;
  }
}

/* Fix body spacing for Ultra Small devices when the menu bar wraps to 2 lines */
@media (max-width: @navbar-tiny-wrap) {
  body {
    padding-top: @navbar-two-row-height;
  }
}
```

## Options

None.

## License

MIT License, see https://github.com/philipabbey/bootstrap-config/blob/master/LICENSE

## Example
npm run test

## Related Works

1. This code is based almost entirely on work by Thomas Alexander under
   'bootstrap-config-to-variable-master', https://github.com/tomalex0/bootstrap-config-to-variable

2. NPM module **gulp-bootstrap-configurator**, https://www.npmjs.com/package/gulp-bootstrap-configurator

3. NPM module **bootstrap**, https://www.npmjs.com/package/bootstrap

4. Bootstrap, http://getbootstrap.com/
