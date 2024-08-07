const { Router } = require('express');

const { change, create, getAll, remove } = require('../controllers/quiz-cotroller');

const isAdmin = require('../middlewares/is-Admin-middleware');
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/quiz', isAdmin, create);
router.get('/quiz', isAuth, getAll);
router.put('/quiz/:id', isAdmin, change);
router.delete('/quiz/:id', isAdmin, remove)

module.exports = router;