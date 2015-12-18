var express = require('express'),
  router = express.Router(),
  Ctrl = require('../controller/user');

router.all('*', Ctrl.Permission);
router.get('/', Ctrl.Index);
router.get('/list', Ctrl.List);
router.get('/edit', Ctrl.Edit);
router.post('/upload', Ctrl.Upload);

module.exports = router;