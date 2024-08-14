const { Router } = require('express');

const { change, create, getAll, remove } = require('../controllers/comment-controller');
 
const isAuth = require('../middlewares/is-Auth-middleware');

const router = Router();

router.post('/comment', create);
router.get('/comment', getAll);
router.put('/commnet/:id', change);
router.delete('/comment/:id', remove)

module.exports = router;