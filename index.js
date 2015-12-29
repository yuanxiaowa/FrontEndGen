var exec = require('child_process').exec;
var fs = require('fs')

function action(cmd, name) {
    var _e = exec(cmd);
    _e.stdout.pipe(process.stdout)
    _e.stderr.pipe(process.stderr);
    _e.on('close', function (code) {
        console.error(name + ' closed: ' + code);
    });
}

action('gulp watch', 'watch');
action('supervisor app', 'server');