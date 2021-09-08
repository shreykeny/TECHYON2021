const router =require('express').Router()
const {addEvent,updateEvent, deleteEvent} = require("../Controllers/events")

router.delete("/del/:eventName", deleteEvent)
router.post("/add/:eventName", addEvent)
router.put("/update/:eventName", updateEvent)

module.exports =router