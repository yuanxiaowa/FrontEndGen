var User = require('../model/user');

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

module.exports = {
  Permission: Permission,
  Index: Index
};