var fs = require('fs');
var path = require('path');

var multiparty = require('multiparty');
var Component = require('../model/component');
var Interface = require('../model/interface');

function Permission (req, res, next) {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
}

function Index (req, res) {
    res.render('user/index', {
        title: '用户中心'
    });
}

function List(req, res) {
    res.render('user/list', {
        title: '列表'
    });
}

function Edit(req, res) {
    res.render('user/edit', {
        title: '上传'
    })
}

//- {"method": "post"}
function Upload(req, res) {
    var form = new multiparty.Form({
        uploadDir: 'app/_temp'
    });
    form.parse(req, function(err, fields, files) {
        var name = fields.name[0];
        if (!name) {
            for (var o in files) {
                var _arr = files[o];
                _arr.forEach(function (file) {
                    fs.unlink(file.path);
                });
            }
            return res.redirect('edit');
        } 
        var type = +fields.type[0];
        var data = {};
        for (var o in files) {
            (function (o) {
                var _arr = files[o];
                _arr.forEach(function (file) {
                    if (0 == file.size) {
                        fs.unlink(file.path);
                    } else {
                        if (o == 'image') {
                            if (!data[o]) {
                                data[o] = [file.path];
                            } else {
                                data[o].push(file.path);
                            }
                        } else {
                            data[o] = file.path;
                        }

                        var rs = fs.createReadStream(file.path);
                        rs.pipe(fs.createWriteStream(path.join('app/_src', o, path.basename(file.path))));
                        rs.on('end', function () {
                            fs.unlink(file.path);
                        });
                    }
                });
            })(o);
        }
        data.type = type;
        data.name = name;
        data.user = req.session.user._id;
        res.redirect('list');
    });
}
//- proc
function GoProc(req, res) {
    res.render('user/proc', {
        title: '处理'
    })
}

//- {"method": "post"}
function Proc(req, res) {
    var name = req.body.name;
    var arr = [];
    var reg = /(?:^|:)\s*(\.|\w+)/gm;
    fs.readFile('app/_src/css/base/reset.styl', 'utf8', function (err, txt) {
        txt = txt.replace(/\/\*[\s\S]*?\*\//g, '');
        var _reg = /\s*([^}\/]*\})/g;
        var _arr = [];
        var _prereg = /([^{]+)([\s\S]*)/
        while (_reg.test(txt)) {
            _prereg.test(RegExp.$1);
            var _btxt = RegExp.$2;
            var _prearr = RegExp.$1.split(/\s*,\s*/);
            var result = [];
            _prearr.forEach(function (item) {
                item = item.trim();
                if (item == 'body' || item == 'html' || /^\[/.test(item) || isIn(item, arr)) {
                    result.push(item);
                }
            });
            if (result.length > 0) {
                _arr.push(result.join(',') + _btxt);
            }
        }
        res.write(_arr.join('\n'))
        res.write(arr.join());
        res.end();
    });
    name = name.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/, '');
    while (reg.test(name)) {
        arr.push(RegExp.$1);
    }
}

//- interface
function GoInterface(req, res) {
    Interface.find({
        userId: req.session.user._id
    }, '_id name protocal', function (err, items) {
        res.render('user/interface', {
            title: '我的项目',
            items: items
        });
    });
}

//- {"route": "interface/add"}
function GoInterfaceAdd(req, res) {
    res.render('user/interface-edit', {
        title: '添加项目',
        item: {
            interfaces: []
        }
    });
}

//- {"route": "interface/edit/:id"}
function GoInterfaceEdit(req, res) {
    Interface.findOne({
        _id: req.params.id,
        userId: req.session.user._id
    }, function (err, result) {
        if (!err) {
            res.render('user/interface-edit', {
                title: '编辑项目',
                item: result
            });
        }
    });
}

//- {"route": "interface/edit", "method": "post"}
function InterfaceEdit(req, res) {
    var item = req.body.item;
    var _id = item._id;
    if (_id) {
        Interface.findByIdAndUpdate(_id, item, function (err) {
            if (err) {
                console.log(err)
            }
            res.redirect('/user/interface');
        });
    } else {
        item.userId = req.session.user._id;
        var it = new Interface(item);
        it.save(function (err, it) {
            if (err) {
                console.log(err);
            }
            res.redirect('/user/interface');
        });
    }
}

//- {"route": "interface/del", "method": "delete"}
function InterfaceDel(req, res) {
    var _id = req.body._id;
    Interface.findByIdAndRemove(_id, function (err) {
        if (err) {
            console.log(err)
        }
        var b = !err;
        res.json(b);
    });
}

//- interface/:id
function GoShowInterface(req, res) {
    Interface.findById(req.params.id, function (err, item) {
        res.render('user/interface-show', {
            title: item.name,
            item: item
        });
    })
}

function isIn(str, obj) {
    if (typeof obj == 'string') {
        return obj.indexOf(str) > -1;
    }
    for (var i in obj) {
        if (new RegExp('\\b' + obj[i] + '\\b').test(str)) {
            return true;
        }
    }
    return false;
}

module.exports = {
  Permission: Permission,
  Index: Index,
  List: List,
  Edit: Edit,
  Upload: Upload,
  GoProc: GoProc,
  Proc: Proc,
  GoInterface: GoInterface,
  GoInterfaceAdd: GoInterfaceAdd,
  GoInterfaceEdit: GoInterfaceEdit,
  InterfaceEdit: InterfaceEdit,
  InterfaceDel: InterfaceDel,
  GoShowInterface: GoShowInterface
};