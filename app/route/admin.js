var express = require('express'),
  router = express.Router(),
  Ctrl = require('../controller/admin');

router.all('*', Ctrl.Permission);
router.get('/', Ctrl.Index);
router.get('/user', Ctrl.User);
router.delete('/user/del', Ctrl.UserDel);
router.get('/protocal', Ctrl.Protocal);
router.get('/protocal/add', Ctrl.GoProtocalAdd);
router.post('/protocal/add', Ctrl.ProtocalAdd);
router.delete('/protocal/del', Ctrl.ProtocalDel);


module.exports = router;