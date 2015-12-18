var mongoose = require('mongoose'),
    ComponentSchema = require('../schema/component'),
    Component = mongoose.model('Component', ComponentSchema);

module.exports = Component;