// const dirs=__dirname.split("/")
// var root=""
// dirs.forEach((element,index)=>{
//     if(index+1 != dirs.length)
//         root+= element+"/"
// })
// const dashboard=root+"public/html-dashboard-page/dashboard.html"
// const login=root +"public/html-login-page/login.html"

// exports.renderDashboard = (req, res) => {
//     res.sendFile(dashboard)
// };
// exports.renderLogin = (req, res) => {
//     res.sendFile(login)
// };

const Admin = require('../models/admin');
const Teams = require('../models/teams');
const Events = require('../models/events');
const Members = require('../models/members');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const teams = require('../models/teams');

exports.signup = (req, res, next) => {
  const { userId, password } = req.body;
  if (userId === '' || password === '') {
    const err = new Error('Invalid id or password');
    err.statusCode = 422;
    throw err;
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const admin = new Admin({
        userId: userId,
        password: hashedPassword,
      });

      return admin.save();
    })
    .then((result) => {
      res.status(201).json({ msg: 'Admin user created', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { userId, password } = req.body;
  let loadedAdmin;
  Admin.findOne({ userId: userId })
    .then((admin) => {
      if (!admin) {
        const error = new Error('UserId did not match!');
        error.statusCode = 401;
        throw error;
      }
      loadedAdmin = admin;
      return bcrypt.compare(password, admin.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Incorrect password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          userId: admin.userId,
        },
        process.env.JWT_SECRET,
        { expiresIn: '20m' }
      );
      res.status(200).json({ token: token, userId: loadedAdmin.userId });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTeams = (req, res) => {
  Teams.find().exec((err, team) => {
    if (err) {
      return res.status(400).json({
        error: 'cannot get teams',
      });
    }
    res.json({ team });
  });
};
exports.getEvents = (req, res) => {
  Events.find().exec((err, event) => {
    if (err) {
      return res.status(400).json({
        error: 'cannot get events',
      });
    }
    res.json({ event });
  });
};
exports.getMembers = (req, res) => {
  res.json('hello');
};
exports.getAllTeamsForEvent = (req, res) => {
  const eventName = req.params.eventName;
  Events.findOne({ eventName: eventName }).then((event) => {
    // console.log(event);
    Teams.find({ eventId: event._id })
      .populate('eventId')
      .exec((err, doc) => {
        if (err) {
          return console.error(err);
        }
        res.json({ teams: doc });
      });
  });
};
exports.getAllMembersForEvent = (req, res) => {
  const eventName = req.params.eventName;
  Events.findOne({ eventName: eventName }).then((event) => {
    Members.find({ eventId: event._id })
      .populate('eventId')
      .exec((err, doc) => {
        if (err) {
          return console.error(err);
        }
        res.json({ teams: doc });
      });
  });
};
