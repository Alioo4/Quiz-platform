const { Router } = require('express');

const { change, create, getAll, remove } = require('../controllers/category-controller');

const isAdmin = require('../middlewares/is-Admin-middleware');
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/category', isAdmin, create);
router.get('/category', isAuth, getAll);
router.put('/category/:id', isAdmin, change);
router.delete('/category/:id', isAdmin, remove)

module.exports = router;