const router =require('express').Router()
const {addTeam} = require("../Controllers/teams")


router.post("/add", addTeam)

module.exports =router