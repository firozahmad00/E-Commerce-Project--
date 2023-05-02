const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.ctrl');
const middlewares = require('../middlewares');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/forgotPassword', authCtrl.sendMail);
router.post('/updatePassword', authCtrl.updatePassword);
router.get('/:userId', authCtrl.myProfile);
router.get('/', middlewares.authorization, authCtrl.users);

module.exports = router;