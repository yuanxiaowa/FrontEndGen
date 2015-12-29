var mongoose = require('mongoose'),
  ProtocalSchema = require('../schema/protocal'),
  Protocal = mongoose.model('Protocal', ProtocalSchema);

module.exports = Protocal;