const router = require('express').Router();
const mailCtrl = require('../controllers/nodemail')

router.post('/', mailCtrl.sendTestMail)

module.exports = router