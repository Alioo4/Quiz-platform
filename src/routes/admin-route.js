const { Router } = require('express');

const { login, changeUser, getUsers } = require('../controllers/admin-login');

const isAdmin = require('../middlewares/is-Admin-middleware')

const router = Router();

router.post('/admin/login', login);
router.get('/admin/users', isAdmin, getUsers);
router.put('/admin/change', isAdmin, changeUser);

module.exports = router;