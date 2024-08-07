const { Router } = require('express');

const { change, create, getAll, remove, checking } = require('../controllers/check-controller');

const isAdmin = require('../middlewares/is-Admin-middleware');
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/answer', isAdmin, create);
router.get('/answer', isAuth, getAll);
router.put('/answer/:id', isAdmin, change);
router.delete('/answer/:id', isAdmin, remove);
router.put('/answer/cheking', isAuth, checking)

module.exports = router;