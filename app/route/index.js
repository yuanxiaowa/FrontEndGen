var express = require('express'),
  router = express.Router(),
  Ctrl = require('../controller/index');

router.get('/', Ctrl.Index);
router.get('/login', Ctrl.GoLogin);
router.post('/login', Ctrl.Login);
router.get('/logout', Ctrl.Logout);
router.get('/register', Ctrl.GoRegister);
router.post('/register', Ctrl.Register);

module.exports = router;