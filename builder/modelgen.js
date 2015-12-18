var fs = require('fs');
var path = require('path');
var tool = require('./tool');
var temp = require('./template');

module.exports = function (md) {
    return function (stat) {
        if (!/^(?!_).*\.js$/.test(stat.path)) {
            return;
        }
        var file = path.basename(stat.path);
        var rfile = path.join(path.dirname(stat.path), '../' + md, file);
        var name = path.basename(file, '.js');
        if (stat.type === 'added' || stat.type === 'renamed') {
            fs.readFile(stat.path, 'utf8', function (err, txt) {
                tool.exists(rfile, function (b) {
                    if (!b) {
                        fs.writeFile(rfile, temp.model(name));
                    }
                });
                setTimeout(function () {
                    fs.writeFile(stat.path, temp.schema(name))
                }, 100);
            });
        }
    }
};