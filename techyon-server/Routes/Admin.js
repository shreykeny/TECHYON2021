const router = require('express').Router();
// const { renderLogin, renderDashboard } = require('../Controllers/admin');
const adminController = require('../Controllers/admin');

router.put('/signup', adminController.signup);
router.post('/login', adminController.login);

module.exports = router;
