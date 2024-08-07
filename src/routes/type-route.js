const { Router } = require('express');

const { change, create, getAll, remove } = require('../controllers/type-controller');

const isAdmin = require('../middlewares/is-Admin-middleware');
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/type', isAdmin, create);
router.get('/type', isAuth, getAll);
router.put('/type/:id', isAdmin, change);
router.delete('/type/:id', isAdmin, remove)

module.exports = router;