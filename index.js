var fs = require('fs');

const MODULE_NAME = "bootstrap-config";

/**
 * Bootstrap config.json to variable.less (nodejs bootstrap-config package)
 *
 * A nodejs module created by Philip Abbey which can in turn be run from Gulp as
 * part of a build script.
 *  * Based on original code 'bootstrap-config-to-variable-master' by Thomas Alexander
 *  * See https://github.com/tomalex0/bootstrap-config-to-variable/blob/master/README.md
 *
 * @param  {String} configFile path/config.json of Bootstrap produced config file
 * @param  {String} lessFile   path/variables.less of Bootstrap variables.less file
 */
module.exports = function(configFile, lessFile) {

  var missingItmes = {
    "@zindex-navbar": 1000,
    "@zindex-dropdown": 1000,
    "@zindex-popover": 1060,
    "@zindex-tooltip": 1070,
    "@zindex-navbar-fixed": 1030,
    "@zindex-modal-background": 1040,
    "@zindex-modal": 1050,
    "@dl-horizontal-breakpoint": "@grid-float-breakpoint"
  };

  function merge_options(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  };

  fs.readFile(configFile, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var obj = merge_options(JSON.parse(data).vars, missingItmes);

    if (fs.existsSync(lessFile)) {
      fs.unlinkSync(lessFile);
    }
    fs.appendFileSync(lessFile, "// Compiled by " + MODULE_NAME + " from " + configFile + "\n");
    for (item in obj) {
      var lessvar = item + ':  ' + (obj)[item];
      fs.appendFileSync(lessFile, lessvar + ";\n");
    }
  });
}