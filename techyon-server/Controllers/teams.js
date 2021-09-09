const Team = require('../models/teams.js');
const Member = require('../models/members');
const Teams = require('../models/teams');
const { data } = require('autoprefixer');
const Event = require("../models/events")

exports.addTeam = async (req, res) => {
  var obj = { ...req.body };
  const members = parseInt(req.body.members);
  let names,
    emails,
    departments,
    phoneNos = [];
  let memberIds = [];
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'object') {
      if (key === 'name') names = val;
      else if (key === 'department') departments = val;
      else if (key === 'phoneNo') phoneNos = val;
      else if (key === 'email') emails = val;
    }
  }
var memberList=[]
    for (var i = 0; i < members; i++) {
      const member = {
        name: names[i],
        email: emails[i],
        department: departments[i],
        phoneNo: phoneNos[i],
      }
      memberList.push(member)
    }


  await Member.insertMany(memberList).then(function(datas,err){
      console.log(datas)  // Success
      datas.forEach(element => {
       memberIds.push(element._id)
      });
      
  }).catch(function(error){
      console.log(error)      // Failure
  });
 

const eventId= await this.getEventById(req.body.eventName)

const team = new Teams({
  teamName: req.body.teamName,
  members: memberIds,
  eventId:eventId
})
 
const savedTeam= team.save()
  res.sendStatus(200)
};

exports.getEventById =async (eventName) =>  {
  const event = await Event.findOne({
    "eventName": eventName
})
return event._id
}


