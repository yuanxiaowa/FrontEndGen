var http = require('http');

module.exports = function(options) {
    var host = options.host,
        path = options.path;
    return function(req, res) {
        var headers = req.headers;
        headers['host'] = host;
        headers['referer'] = 'http://' + host;
        var request = http.request({
            host: host,
            method: req.method,
            headers: headers,
            path: req.url.replace(new RegExp('^' + path), '')
        }, function(_res) {
            res.writeHead(_res.statusCode, _res.headers);
            _res.pipe(res);
        });
        if (/post/i.test(req.method)) {
            req.pipe(request);
        } else {
            request.end();
        }
        request.on('error', function() {
            res.setHeader('Content-Type', 'text/json; utf-8');
            res.end('{"success": false, "msg": "访问服务器出错！！！"}');
        });
    }
};
