// 将函数导入输出

var fs = require('fs');
var tool = require('./tool');

var argv = [].slice.call(process.argv, 2);

if (argv.length > 0) {
    argv.forEach(function (file) {
        fs.readFile(file, 'utf8', function (err, txt) {
            var reg1 = /\s*(module\.exports\s*=\s*\{[^}]*\};?|exports\.\w.*)/g;
            var reg2 = /^function\s+(\w+)/mg;
            var arr = [];
            while (reg2.test(txt)) {
                arr.push(RegExp.$1);
            }
            txt = txt.replace(reg1, '');
            fs.writeFile(file, txt + '\n\nmodule.exports = ' + tool.beatify(arr) + ';');
        })
    })
} else {
    console.error('请选择文件');
}