var Schema = require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

var interfaceSchema = new Schema({
    name: String,
    protocal: {
        default: 0,
        type: Number
    },
    reqtype: {
        default: 0,
        type: Number
    },
    rettype: {
        default: 0,
        type: Number
    },
    desc: String,
    interfaces: [
        {
            name: String,
            url: String,
            method: Number,
            param: String,
            req: String,
            ret: String
        }
    ],
    userId: {
        type: ObjectId,
        ref: 'User'
    }
});

interfaceSchema.statics = {
    fetch: function (cb) {
        return this
            .find()
            .exec(cb);
    }
};

module.exports = interfaceSchema;