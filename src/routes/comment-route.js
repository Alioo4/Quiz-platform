const { Router } = require('express');

const { change, create, getAll, remove } = require('../controllers/comment-controller');
 
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/comment', isAuth, create);
router.get('/comment', isAuth, getAll);
router.put('/commnet/:id', isAuth, change);
router.delete('/comment/:id', isAuth, remove)

module.exports = router;