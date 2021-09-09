const router = require('express').Router();
// const { renderLogin, renderDashboard } = require('../Controllers/admin');
const { signup } = require('../Controllers/admin');

router.put('/signup', signup);

module.exports = router;
