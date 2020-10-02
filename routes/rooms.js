const router = require('express').Router();
const roomsCtrl = require('../controllers/rooms');

// Public Routes
router.get('/', roomsCtrl.index);

// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, roomsCtrl.create);
router.delete(':/id', checkAuth, roomsCtrl.delete);
router.put('/:id', checkAuth, roomsCtrl.update);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;