var express = require('express'),
  router = express.Router(),
  Ctrl = require('../controller/admin');

router.all('*', Ctrl.Permission);
router.get('/', Ctrl.Index);


module.exports = router;