const router = require('express').Router();
// const { renderLogin, renderDashboard } = require('../Controllers/admin');
const adminController = require('../Controllers/admin');
const auth = require('../middleware/auth');

router.put('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/getTeams', auth, adminController.getTeams);
router.get('/getEvents', auth, adminController.getEvents);
router.get('/getMembers', adminController.getMembers);
router.get(
  '/getMembers/:eventName',

  adminController.getAllMembersForEvent
);
router.get('/getTeams/:eventName', adminController.getAllTeamsForEvent);

module.exports = router;
