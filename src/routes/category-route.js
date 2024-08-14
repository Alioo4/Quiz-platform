const { Router } = require('express');

const { change, create, getAll, remove } = require('../controllers/category-controller');

const isAdmin = require('../middlewares/is-Admin-middleware');
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/category', create);
router.get('/category', getAll);
router.put('/category/:id', change);
router.delete('/category/:id', remove)

module.exports = router;