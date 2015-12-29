var express = require('express'),
  router = express.Router(),
  Ctrl = require('../controller/user');

router.all('*', Ctrl.Permission);
router.get('/', Ctrl.Index);
router.get('/list', Ctrl.List);
router.get('/edit', Ctrl.Edit);
router.post('/upload', Ctrl.Upload);
router.get('/proc', Ctrl.GoProc);
router.post('/proc', Ctrl.Proc);
router.get('/interface', Ctrl.GoInterface);
router.get('/interface/add', Ctrl.GoInterfaceAdd);
router.get('/interface/edit/:id', Ctrl.GoInterfaceEdit);
router.post('/interface/edit', Ctrl.InterfaceEdit);
router.delete('/interface/del', Ctrl.InterfaceDel);
router.get('/interface/:id', Ctrl.GoShowInterface);


module.exports = router;