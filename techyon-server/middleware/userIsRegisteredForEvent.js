const Members = require("../models/members")
const Events = require("../models/events")
const {checkEventTypeIsSolo} = require("../common")

exports.checkIfMemberIsRegistered = async (req, res, next) => {
    if(!checkEventTypeIsSolo(req.body.eventName))
        next()
let bug =false   
  await Members.findOne({ "phoneNo": req.body.phoneNo,"position": "Solo" }).then(function(result) {
        if( result){
               Events.findOne({
                   eventName: req.body.eventName
               }).then(function(resultx) {
                    if(result.eventId.equals(resultx._id)){
                        bug =true
                        res.status(300).json({
                            "error": "phoneNo "+req.body.phoneNo +"registered already for this event"
                        })
                    }
                    else 
                        next()
               }) 
               
        }
    })
    } 