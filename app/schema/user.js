var Schema = require('mongoose').Schema;

var userSchema = new Schema({
    name: String,
    pwd: String,
    desc: String,
    dir: String,
    img: String,
    email: String,
    role: {
        default: 1,
        type: Number
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
});

userSchema.pre('save', function (next) {
    next();
});

userSchema.statics = {
    fetch: function (cb) {
        return this
            .find()
            .exec(cb);
    }
};

module.exports = userSchema;