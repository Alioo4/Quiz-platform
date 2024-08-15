const { Router } = require('express');

const { change, create, getAll, remove } = require('../controllers/type-controller');

const isAdmin = require('../middlewares/is-Admin-middleware');
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/type', create);
router.get('/type/:id', getAll);
router.put('/type/:id', change);
router.delete('/type/:id', remove)

module.exports = router;