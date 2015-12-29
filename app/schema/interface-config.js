var Schema = require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;
var interfaceConfigSchema = new Schema({
    server: String,
    port: {
        type: Number,
        min: 1,
        max: 65535
    },
    path: String,
    interfaceId: {
        type: ObjectId,
        ref: 'Interface'
    }
});

module.exports = interfaceConfigSchema;