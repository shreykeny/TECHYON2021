const Team = require('../models/teams.js');
const Member = require('../models/members');
const Teams = require('../models/teams');
const Event = require('../models/events');
const { body, validationResult } = require('express-validator');
const {
  getEventByName,
  checkEventTypeIsSolo,
  checkEventTypeIsIntra,
  mapNamesFromReqObj,
} = require('../common');

exports.addTeam = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  var obj = { ...req.body };
  const members = parseInt(req.body.members);
  const names = mapNamesFromReqObj(obj);
  let memberIds = [];
  var memberList = [];
  let member = {};

  const eventId = await getEventByName(req.body.eventName);
  for (var i = 0; i < members; i++) {
    const pos = (await checkEventTypeIsSolo(req.body.eventName))
      ? 'Solo'
      : i === 0
      ? 'Leader'
      : 'Member';
      
    member = {
      name: pos === 'Solo' ? req.body.name : pos === "Leader"? names[0]: names[i],
      department: req.body.department,
      college: req.body.college,
      year: req.body.year,
      position: pos,
      eventId: eventId,
    };
    if (pos != 'Member'){
      member.phoneNo =req.body.phoneNo
      member.email = req.body.email
    }
    memberList.push(member);
  }

  await Member.insertMany(memberList)
    .then(function (datas, err) {
      console.log(datas); // Success
      datas.forEach((element) => {
        memberIds.push(element._id);
      });
    })
    .catch(function (error) {
      console.log(error); // Failure
    });

  if (!(await checkEventTypeIsSolo(req.body.eventName))) {
    
    const team = new Teams({
      teamName: req.body.teamName,
      members: memberIds,
      year: req.body.year,
      department: req.body.department,
      college: await checkEventTypeIsIntra(req.body.eventName)?"PCCE":req.body.college,
      eventId: eventId,
    });

    const savedTeam = team.save();
    res.json({
      Team: 'savedTeam',
    });
  } else {
    res.json({
      Member: 'saved',
    });
  }
};
