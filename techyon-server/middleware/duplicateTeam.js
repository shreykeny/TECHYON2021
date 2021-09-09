const Team = require("../models/teams")

exports.checkDuplicateTeamName = async (req, res, next) => {
    
    Team.exists({ "teamName": req.body.teamName }).then(function(result) {
                if( !result){
                    next();
                }
                else{
                    return res.status(400).json({
                         error: "Teamname Exists"
                    });  
                     }
                    })
      
    }

    
