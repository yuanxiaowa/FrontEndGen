var mongoose = require('mongoose'),
  InterfaceSchema = require('../schema/interface'),
  Interface = mongoose.model('Interface', InterfaceSchema);

module.exports = Interface;