const router =require('express').Router()
const {addTeam} = require("../Controllers/teams")
const {checkDuplicateTeamName} = require("../middleware/duplicateTeam")
const { checkIfMemberIsRegistered} = require("../middleware/userIsRegisteredForEvent")
const {checkEventExists} = require("../middleware/checkIfEventNameExists")
const { body, check,validationResult } = require('express-validator');
const {mapNamesFromReqObj,checkEventTypeIsSolo} = require("../common")

router.post("/add",
[   check('email').exists(),
    check('college').exists(),
    check("members").exists(),
    check("department").exists(),
    check("year").exists(),
    check("name").exists(),
    check("teamName").exists(),
    body("members").custom(membersValidate),
    body("email").isEmail().normalizeEmail(),
    body("phoneNo").isLength({
        min: 10,
        max: 10
    }),
    checkEventExists,
    checkDuplicateTeamName,
    checkIfMemberIsRegistered
], 
addTeam)

async function membersValidate(value,{req}){
    var obj = { ...req.body };
    const names =mapNamesFromReqObj(obj)
    if (value < 1 || value > 5 ) 
        return Promise.reject('Invalid Members value');
    if (names.length != value && typeof names === "object"  ) 
        return Promise.reject('Invalid Members value');
    if (value!=1 && typeof names === "string" ) 
        return Promise.reject('Invalid Members value');
    if(checkEventTypeIsSolo(req.body.eventName) && typeof names !="string" )
        return Promise.reject('Multiple names for a solo event');
}
module.exports =router