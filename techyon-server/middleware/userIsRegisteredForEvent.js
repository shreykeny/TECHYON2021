const Members = require("../models/members")
const Events = require("../models/events")

exports.checkIfMemberIsRegistered = async (req, res, next) => {
    const phoneNos=req.body.phoneNo
    let proceed= false
    let memberExist
   for(var i=0; i< phoneNos.length; i++){
    if(proceed)
        break;
  await Members.findOne({ "phoneNo": phoneNos[i] }).then(function(result) {
        if( result){
            const event=Events.findOne({
                _id : result.eventId
            }).then(function(event) {
                if(event. eventType === "Team" && parseInt(req.body.members) > 0)
                    {   proceed= true
                        memberExist = result.phoneNo
                    } 
                    else 
                        next();    
            }) 
               
        }
    }) 
   
}
   if(proceed)
        res.status(401).json({
            "error": "phoneNo "+memberExist +"exists in another team"
        })
   else
        next()
}