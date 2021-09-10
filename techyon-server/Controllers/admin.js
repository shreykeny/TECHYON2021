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

exports.login = async (req, res, next) => {
  const { userId, password } = req.body;
  let loadedAdmin;

  try {
    const admin = await Admin.findOne({ userId: userId });
    if (!admin) {
      const error = new Error('UserId did not match!');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, admin.password);

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
    res.status(200).json({ token: token, userId: admin.userId });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Teams.find();
    if (!teams) {
      const error = new Error('Teams not found');
      error.statusCode = 400;
      throw error;
    }
    res.json({ teams });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Events.find();
    if (!events) {
      const error = new Error('Events not found');
      error.statusCode = 400;
      throw error;
    }
    res.json({ events });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getMembers = async (req, res, next) => {
  try {
    const members = await Members.find();
    if (!members) {
      const error = new Error('Members not found');
      error.statusCode = 400;
      throw error;
    }
    res.json({ members });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getAllTeamsForEvent = async (req, res, next) => {
  const eventName = req.params.eventName;

  try {
    const event = await Events.findOne({ eventName: eventName });

    const teams = await Teams.find({ eventId: event._id }).populate('eventId');

    res.json({ teams: teams });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};

exports.getAllMembersForEvent = async (req, res, next) => {
  const eventName = req.params.eventName;
  try {
    const event = await Events.findOne({ eventName: eventName });
    const members = await Members.find({ eventId: event._id }).populate(
      'eventId'
    );

    res.json({ members: doc });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      next(err);
    }
  }
};
