const router = require('express').Router();
const postsCtrl = require('../controllers/posts');

// Public Routes
router.get('/', postsCtrl.index);

// Protected Routers
router.use(require('../config/auth'))
router.post('/', checkAuth, postsCtrl.create)
router.delete(':/id', checkAuth, postsCtrl.delete)
router.put('/:id', checkAuth, postsCtrl.update);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }
  
module.exports = router;