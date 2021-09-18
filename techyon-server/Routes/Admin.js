const router = require('express').Router();
const adminController = require('../Controllers/admin');
const auth = require('../middleware/auth');

router.put('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/getTeams', auth, adminController.getTeams);
router.get('/getEvents', adminController.getEvents);
router.get('/getMembers', auth, adminController.getMembers);
router.get(
  '/getMembers/:eventName',
  auth,

  adminController.getAllMembersForEvent
);
router.get('/getTeams/:eventName', auth, adminController.getAllTeamsForEvent);
router.get('/getpdf', adminController.createPdf);

module.exports = router;
