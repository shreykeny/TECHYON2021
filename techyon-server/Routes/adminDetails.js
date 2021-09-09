const router =require('express').Router()
const {getTeams, getEvents, getMembers, getAllMembersForEvent, getAllTeamsForEvent} = require("../Controllers/AdminDetails")

router.get("/getTeams",getTeams)
router.get("/getEvents",getTeams)
router.get("/getMembers",getMembers)
router.get("/getMembers/:eventName",getAllMembersForEvent)
router.get("/getTeams/:eventName",getAllTeamsForEvent)

module.exports = router