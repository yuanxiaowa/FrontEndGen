var tool = require('./tool');

function route(name, content) {
    return 'var express = require(\'express\'),\n'
        + '  router = express.Router(),\n'
        + '  Ctrl = require(\'../controller/' + name + '\');\n\n'
        + (content ? content : '')
        + '\n\nmodule.exports = router;';
}

function controller() {
    return '\n\nfunction Index(req, res) {\n\n}\n\nmodule.exports = {\n};';
}

function schema(name) {
    return 'var Schema = require(\'mongoose\').Schema;\n'
        + 'var ' + name + 'Schema = new Schema({\n'
        + '});\n'
        + '\nmodule.exports = ' + name + 'Schema;';
}

function model(name) {
    return 'var mongoose = require(\'mongoose\'),\n'
        + '  ComponentSchema = require(\'../schema/' + name + '\'),\n'
        + '  ' + tool.fu(name) +' = mongoose.model(\'' + tool.fu(name) +'\', ' + tool.fu(name) +'Schema);\n'
        + '\nmodule.exports = ' + tool.fu(name) +';';
}

module.exports = {
  route: route,
  controller: controller,
  schema: schema,
  model: model
};