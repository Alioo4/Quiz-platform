const { Router } = require('express');

const { change, create, getAll, remove } = require('../controllers/quiz-cotroller');

const isAdmin = require('../middlewares/is-Admin-middleware');
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/quiz', create);
router.get('/quiz', getAll);
router.put('/quiz/:id', change);
router.delete('/quiz/:id', remove)

module.exports = router;