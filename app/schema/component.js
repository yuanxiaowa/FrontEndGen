var Schema = require('mongoose').Schema;

var componentSchema = new Schema({
    user: String,
    name: String,
    rimage: String,
    image: Array,
    css: String,
    script: String,
    type: {
        type: Number,
        default: 1
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports = componentSchema;