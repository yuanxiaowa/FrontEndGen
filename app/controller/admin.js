var DUser = require('../model/user');
var DProtocal = require('../model/protocal');

function Permission (req, res, next) {
    if (req.session.user) {
        if (req.session.user.role >= 2) {
            return next();
        }
    }
    return res.redirect('/');
}

function Index (req, res) {
    res.render('admin/index', {title: '管理员页'});
}

function User(req, res) {
    DUser.find()
        .exec(function (err, items) {
            res.render('admin/user', {
                title: '用户列表',
                items: items
            })
        })
}

//- {"method": "delete", "route": "user/del"}
function UserDel(req, res) {}

//- protocal
function Protocal(req, res) {
    DProtocal
        .find(function (err, items) {
            res.render('admin/protocal', {
                title: '协议列表',
                items: items
            });
        });
}

//- protocal/add
function GoProtocalAdd(req, res) {
    res.render('admin/protocal-edit', {
        title: '添加协议'
    });
}

//- {"method": "post", "route": "protocal/add"}
function ProtocalAdd(req, res) {
    var _protocal = req.body.protocal;
    var protocal = new DProtocal(_protocal);
    protocal.save(function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect('.')
    });
}

//- {"method": "delete", "route": "protocal/del"}
function ProtocalDel(req, res) {
    var _id = req.body._id;
    DProtocal.remove({
        _id: _id
    }, function (err) {
        if (err) {
            console.log(err);
        }
        res.json(true);
    });
}

module.exports = {
  Permission: Permission,
  Index: Index,
  User: User,
  UserDel: UserDel,
  Protocal: Protocal,
  GoProtocalAdd: GoProtocalAdd,
  ProtocalAdd: ProtocalAdd,
  ProtocalDel: ProtocalDel
};