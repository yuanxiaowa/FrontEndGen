var fs = require('fs');

/**
 * 首字母大写
 * @param  {String} str 字符串
 * @return {String}     转化后的字符串
 */
function fu(str) {
    return str.replace(/^\w/, function (_) {
        return _.toUpperCase();
    });
}

/**
 * 计算字符串中某个字符的个数
 * @param  {String} str 字符串
 * @param  {Char} c   字符
 * @return {Int}     个数
 */
function rclen(str, c) {
    var len = 0;
    for (var i in str) {
        if (str[i] === c) {
            len++;
        }
    }
    return len;
}

/**
 * 判断文件是否存在
 * @param  {String}   file 文件路径
 * @param  {Function} cb   回调函数
 * @return {void}        
 */
function exists(file, cb) {
    fs.access(file, function (err) {
        cb(!err);
    })
}

/**
 * 美化JSON
 * @param  {String} data 需要格式化的字符串
 * @return {String}      String
 */
function beatify(data) {
    var arr = [];
    if (data instanceof Array) {
        for (var i in data) {
            arr.push(data[i] + ': ' + data[i]);
        }
    } else {
        for (var i in data) {
            arr.push(i + ': ' + data[i]);
        }
    }
    return '{\n  ' + arr.join(',\n  ') + '\n}';
}

/**
 * 循环查找文件
 * @param  {String}   name 文件名
 * @param  {String}   dir  目录名
 * @param  {Function} cb   回调函数
 * @return {void}        
 */
function recurFind(name, dir, cb) {
    fs.access(path.join(dir, name), function (err) {
        if (err) {
            var _pdir = path.dirname(dir);
            if (_pdir != dir) {
                recurFind(name, _pdir, cb);
            } else {
                console.log('没有找到文件');
            }
        } else {
            cb(dir);
        }
    });
}

module.exports = {
  fu: fu,
  rclen: rclen,
  exists: exists,
  beatify: beatify,
  recurFind: recurFind
};