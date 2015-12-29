var fs = require('fs');
var path = require('path');
var tool = require('./tool');

module.exports = function () {
    return function(stat) {
        if (stat.type === 'added') {
            var _p = path.dirname(stat.path);
            var _name = 'common';
            var _txt = 'extends .';
            if (!/\/view$/.test(_p)) {
                _name = path.basename(_p);
                _p = path.dirname(_p);
                _txt += '.';
                _txt += '/layout/' + _name + '\n\nblock content\n';
            } else {
                _txt += '/layout/' + _name + '\n\nblock body\n';
            }
            var tmp = path.join(_p, 'layout', _name + '.jade');
            tool.exists(tmp, function (b) {
                console.log(b)
                if (b) {
                    fs.writeFile(stat.path, _txt);
                } else {
                    fs.writeFile(stat.path, _txt.replace(_name, 'common'))
                }
            })
        }
    }
};