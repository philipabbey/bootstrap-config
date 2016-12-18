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

## Options

None.

## License

MIT License, see https://github.com/philipabbey/bootstrap-config/blob/master/LICENSE

## Example
npm run test

## Related Works

1. This code is based almost entirely on work by Thomas Alexander under
   'bootstrap-config-to-variable-master' (https://github.com/tomalex0/bootstrap-config-to-variable).

2. **gulp-bootstrap-configurator**, https://www.npmjs.com/package/gulp-bootstrap-configurator

3. **bootstrap**, https://www.npmjs.com/package/bootstrap
