function getTags(obj) {
    var reg = /(?:^|:)\s*(\.|\w+)/gm;
    var result = {};
    if (typeof obj == 'string') {
        obj = [obj];
    }
    obj.forEach(function(txt) {
        txt = txt.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/, '');
        while (reg.test(txt)) {
            result[RegExp.$1] = true;
        }
    });
    return Object.keys(result);
}

function isWhiteSpace(c) {
    return ' ' == c
        || '\t' == c
        || '\r' == c
        || '\n' == c;
}

function getTree(obj) {
    var result = {};
    var arr = [];
    var i = 0;
    var len = obj.length;
    var pos = 0;
    var chunk = [];
    var start = true;
    var lines = 1;

    var space = [];

    var _r = false;
    var _n = false;
    for (; i < len; i++) {
        var c = obj[i];
        // 记录行数
        if (c == '\n') {
            lines++;
        }
        // 去除前置空格
        if (start) {
            if (isWhiteSpace(c)) {
                continue;
            }
        }
        start = false;
        if (_n) {
            if (' ' == c
                || '\r' == c
                || '\t' == c) {
                space.push(c);
            } else if ('\n' == c) {
                space.length = 0;
            } else {
                if (space.length > 0) {
                    space.unshift('\n');
                }
                chunk.push.apply(chunk, space);
                chunk.push(c);
                space.length = 0;
                _n = false;
            }
        } else if (c == '\r') {
            _r = true;
        } else if (c == '\n') {
            if (isWhiteSpace(obj[i + 1])) {

            }
            arr.push(chunk.join(''));
            chunk.length = 0;
            _n = true;
        } else {
            chunk.push(c);
        }
    }
    console.log(arr);
    console.log(lines);
}

var fs = require('fs')
fs.readFile('tmp.jade', 'utf8', function (err, txt) {
    getTree(txt);
})

/*function getTree(obj) {
    var result = {};
    var start = true;
    var arr = [];
    var pos = 0;
    var i = 0;
    var len = obj.length;
    var str = [];
    var hasEnter;
    for (; i < len;) {
        var _c = obj[i];
        if (start && (/\s/.test(_c))) {
            i++;
            continue;
        }
        i++;
        start = false;
        if (hasEnter) {
            hasEnter = false;
            if (/\s/.test(_c)) {
                var _p = '\n';
                while (true) {
                    if (_c == ' ') {
                        _p += _c;
                    } else if (_c == '\r') {
                        _c = obj[i++];
                        if (_c == '\n') {
                            _p = '';
                            break;
                        } else {
                            _p += '\r' + _c;
                        }
                    } else if (_c == '\n') {
                        _p = '';
                        _c = obj[i++];
                        break;
                    } else {
                        break;
                    }
                    _c = obj[i++];
                }
                if (_c === undefined) {
                    break;
                }
                str.push(_p);
            } else {
                arr.push(str.join(''));
                str.length = 0;
            }
        }
        if (_c == '\r') {
            _c = obj[i++];
            if (_c == '\n') {
                hasEnter = true;
            } else {
                str.push('\r');
            }
        } else if(_c == '\n') {
            hasEnter = true;
        } else {
            str.push(_c);
        }
    }
    if (typeof str != 'undefined') {
        arr.push(str.join(''));
    }
    return arr;
}*/

exports.module = {
    getTags: getTags
}
