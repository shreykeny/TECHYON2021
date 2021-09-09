const router =require('express').Router()
const {addTeam} = require("../Controllers/teams")
const {checkDuplicateTeamName} = require("../middleware/duplicateTeam")
const { checkIfMemberIsRegistered} = require("../middleware/userIsRegisteredForEvent")
const {checkEventExists} = require("../middleware/checkIfEventNameExists")
const { body, validationResult } = require('express-validator');
const {mapNamesFromReqObj} = require("../common")

router.post("/add",
[
    body("email").isEmail().normalizeEmail(),
    body("phoneNo").isLength({
        min: 10,
        max: 10
    }),
    body("members").custom(membersValidate),
    checkEventExists,
    checkDuplicateTeamName,
    checkIfMemberIsRegistered
], 
addTeam)

async function membersValidate(value,{req}){
    var obj = { ...req.body };
    const names =mapNamesFromReqObj(obj)
    if (value < 1 || value > 5 && names.length != value  ) 
        return Promise.reject('Invalid Members value');
}
module.exports =router