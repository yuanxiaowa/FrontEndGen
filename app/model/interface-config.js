var mongoose = require('mongoose'),
  InterfaceConfigSchema = require('../schema/interface-config'),
  InterfaceConfig = mongoose.model('InterfaceConfig', InterfaceConfigSchema);

module.exports = InterfaceConfig;