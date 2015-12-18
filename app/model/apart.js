var mongoose = require('mongoose'),
  ComponentSchema = require('../schema/apart'),
  Apart = mongoose.model('Apart', ApartSchema);

module.exports = Apart;