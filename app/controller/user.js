var multiparty = require('multiparty');
var Component = require('../model/component')
var fs = require('fs');
var path = require('path');

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

module.exports = {
  Permission: Permission,
  Index: Index,
  List: List,
  Edit: Edit,
  Upload: Upload
};