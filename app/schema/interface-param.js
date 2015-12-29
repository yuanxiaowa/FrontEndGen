var Schema = require('mongoose').Schema;
var interfaceParamSchema = new Schema({
    param: String,
    data: String,
    interfaceIndex: Array
});

module.exports = interfaceParamSchema;