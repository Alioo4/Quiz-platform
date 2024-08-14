const { Router } = require('express');

const { login, changeUser, getUsers } = require('../controllers/admin-login');

const isAdmin = require('../middlewares/is-Admin-middleware')

const router = Router();

router.post('/admin/login', login);
router.get('/admin/users', getUsers);
router.put('/admin/change', changeUser);

module.exports = router;