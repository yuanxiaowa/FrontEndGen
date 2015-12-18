var express = require('express');
var app = express();

var cons = require('consolidate');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser'); // body转换
var compression = require('compression'); // 内容压缩
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoStore = require('connect-mongo')(session);

var moment = require('moment');

var routes = require('./app/route/_config');
var pipeStream = require('./app/plugin/pipe-stream');

var mongoose = require('mongoose');

var dbUrl = 'mongodb://10.0.0.112/myproject';

// 数据库
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', function() {
    console.log('mongodb error');
});
db.once('open', function(cb) {
    console.log('mongodb open');
});


app.locals.moment = moment;

app.use(logger('dev'));
// 静态资源
app.use('/public', express.static('app/public'));
app.use('/bower_components', express.static('bower_components'));
app.use(favicon(__dirname + '/app/public/favicon.ico'));

// 模板引擎
app.engine('jade', cons.jade);
app.set('view engine', 'jade');
app.set('views', 'app/view');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(compression({
    filter: function(req, res) {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res)
    }
}));
app.use(cookieParser());
app.use(session({
    secret: 'ody',
    // session 持久化
    store: new mongoStore({
        url: dbUrl,
        collections: 'sessions'
    })
}));

app.use(function(req, res, next) {
    if (req.session.user) {
        app.locals.user || (app.locals.user = req.session.user);
    } else {
        app.locals.user && delete app.locals.user
    }
    next();
});

app.use('/baidupic', pipeStream({
    host: 'a.hiphotos.baidu.com',
    path: 'baidupic'
}));

// 路由配置
for (var k in routes) {
    app.use(k, routes[k]);
}
// 404
app.use(function(req, res, next) {
    var error = new Error('404 - ' + req.url);
    error.status = 404;
    next(error);
});

if (app.get('env') === 'development') {
    app.set('showStackError', true);
    app.locals.pretty = true;
    mongoose.set('debug', true);
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function() {
    console.log('server is running....', server.address());
});
