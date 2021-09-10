const Team = require('../models/teams.js');
const Member = require('../models/members');
const Teams = require('../models/teams');
const Event = require('../models/events');
const { body, validationResult } = require('express-validator');
const {
  getEventByName,
  checkEventTypeIsSolo,
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
  // return res.sendStatus(200)
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
    const name = pos === 'Solo' ? req.body.name : names[i];
    if (pos === 'Leader')
      member = {
        name: names[0],
        department: req.body.department,
        year: req.body.year,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        position: pos,
        eventId: eventId,
      };
    else if (pos === 'Member')
      member = {
        name: name,
        department: req.body.department,
        year: req.body.year,
        position: pos,
        eventId: eventId,
      };
    else
      member = {
        name: name,
        department: req.body.department,
        year: req.body.year,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        position: pos,
        eventId: eventId,
      };
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
      college: req.body.college,
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
