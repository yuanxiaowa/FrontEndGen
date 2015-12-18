var fs = require('fs');
var path = require('path');
var tool = require('./tool');
var temp = require('./template');

module.exports = function (rt) {
    return function(stat) {
        if (!/^(?!_).*\.js$/.test(stat.path)) {
            return;
        }
        // 带后缀的控制器文件名
        var file = path.basename(stat.path);
        // 路由全路径
        var rfile = path.join(path.dirname(stat.path), '../' + rt, file);
        var conf = path.join(path.dirname(stat.path), '../' + rt + '/_config.js');
        var name = path.basename(stat.path, '.js');
        // 增加路由
        if (stat.type === 'added' || stat.type === 'renamed') {
            tool.exists(rfile, function (b) {
                if (!b) {
                    fs.writeFile(rfile, temp.route(name));
                }
            });
            fs.writeFile(stat.path, temp.controller());
            fs.readFile(conf, 'utf8', function (err, txt) {
                if (err) {
                    fs.writeFile(conf, 'module.exports = {\n'
                        + '  \'/' + name + '\': require(\'./' + name + '\')'
                        + '};');
                } else {
                    if (!configLine(name).test(txt)) {
                        fs.writeFile(conf, txt.replace(/(?=\r?n\s*\})/, ',\n  \'/' + name + '\': require(\'./' + name + '\')'));
                    }
                }
            })
        } else if (stat.type === 'changed') {
            fs.readFile(stat.path, 'utf8', function (err, txt) {
                var reg = /(?:\/\/-\s*(.+)?\s+)?function\s+([A-Z]\w+)/g;
                var obj = {};
                var rtxt = [];
                while (reg.test(txt)) {
                    var _name = RegExp.$2;
                    obj[_name] = _name;
                    if (_name === 'Permission') {
                        rtxt.push('router.all(\'*\', Ctrl.' + _name + ');\n');
                    } else {
                        var _obj = bd(RegExp.$1);
                        if (_name != 'Index' && '' === _obj.route) {
                            _obj.route = _name.toLowerCase();
                        }
                        rtxt.push('router.' + _obj.method
                            + '(\'' + _obj.route.replace(/^(?!\/)/, '/') + '\', Ctrl.' + _name + ');\n');
                    }
                }
                var _reg = /module\.exports\s*=\s*(\{[^}]*\})/;
                if (_reg.test(txt)) {
                    if (tool.rclen(RegExp.$1, ':') != rtxt.length) {
                        txt = txt.replace(RegExp.$1, tool.beatify(obj));
                        setTimeout(function () {
                            fs.writeFile(stat.path, txt);
                        }, 100);
                        fs.writeFile(rfile, cInitTxt(name, rtxt.join('')));
                    }
                }
            })
        } else if (stat.type === 'deleted') {
            fs.readFile(conf, 'utf8', function (err, txt) {
                fs.writeFile(conf, txt.replace(configLine(name), ''));
            });
        }
    };
};

function bd(str) {
    var obj = {};
    if (/^\{/.test(str)) {
        try {
            obj = JSON.parse(str)
        } catch (e) {
            console.log(obj)
        }
    } else {
        obj['route'] = str;
    }
    if (!('method' in obj)) {
        obj['method'] = 'get';
    }
    if (!('route' in obj)) {
        obj['route'] = '';
    }
    return obj;
}

function configLine(name) {
    return new RegExp(',?\\s+\'/' + name + '\'((?!,).)*');
}