var User = require('../model/user'); 

function Index (req, res) {
    res.render('index', {title: '首页'});
};

//- login
function GoLogin (req, res) {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('login', {title: '登录'});
};

//- {"method": "post"}
function Login (req, res) {
    User.findOne({
        name: req.body.name,
        pwd: req.body.pwd
    }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            delete user.pwd;
            req.session.user = user;
            res.redirect('/');
        } else {
            res.send('登录失败');
        }
    });
};

//- logout
function Logout (req, res) {
    delete req.session.user;
    res.redirect('/');
};

//- register
function GoRegister (req, res) {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('register', {title: '注册'});
};

//- {"method": "post"}
function Register(req, res) {
    var name = req.body.name,
        pwd = req.body.pwd;
    if (name === '' || pwd === '') {
        res.redirect('register');
    } else {
        User.findOne({
            name: name
        }, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                res.redirect('register');
            } else {
                user = new User({
                    name: name,
                    pwd: pwd
                });
                user.save(function (err, user) {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('login');
                });
            }
        });
    }
};

module.exports = {
  Index: Index,
  GoLogin: GoLogin,
  Login: Login,
  Logout: Logout,
  GoRegister: GoRegister,
  Register: Register
};