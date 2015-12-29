var Schema = require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;
var protocalSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = protocalSchema;