const Team = require('../models/teams.js');
const Member = require('../models/members');

exports.addTeam = async (req, res) => {
  var obj = { ...req.body };
  const members = parseInt(req.body.members);
  let names,
    emails,
    departments,
    phoneNos = [];
  let memberList = [];
  console.log(req.body);
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'object') {
      if (key === 'name') names = val;
      else if (key === 'department') departments = val;
      else if (key === 'phoneNo') phoneNos = val;
      else if (key === 'email') emails = val;
    }
  }
  try {
    for (var i = 0; i < members; i++) {
      const member = new Member({
        name: names[i],
        email: emails[i],
        department: departments[i],
        phoneNo: phoneNos[i],
      });

      const savedMember = await member.save();
      console.log(savedMember);
    }
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }

  // const team = new Team({
  //     teamName: req.body.teamName,
  //     address: req.body.address,
  //     age: req.body.age,
  // })
};
