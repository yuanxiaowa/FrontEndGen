var mongoose = require('mongoose'),
  InterfaceParamSchema = require('../schema/interface-param'),
  InterfaceParam = mongoose.model('InterfaceParam', InterfaceParamSchema);

module.exports = InterfaceParam;