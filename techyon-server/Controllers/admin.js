const Admin = require('../models/admin');
const Teams = require('../models/teams');
const Events = require('../models/events');
const Members = require('../models/members');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
var pdf = require('html-pdf-node');

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

    // const count = getIntraData();
    //Getting data for INTRA
    const department = userId.substring(5);
    const firstYear = await Members.countDocuments({
      year: 1,
      department,
    });
    const secondYear = await Members.countDocuments({ year: 2, department });
    const thirdYear = await Members.countDocuments({ year: 3, department });
    const fourthYear = await Members.countDocuments({ year: 4, department });

    res.status(200).json({
      token: token,
      userId: admin.userId,
      IntraStudentCount: {
        First: firstYear,
        Second: secondYear,
        Third: thirdYear,
        Fourth: fourthYear,
      },
    });
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

//Trial route

exports.createPdf = async (req, res, next) => {
  const events = await Events.find();
  const teams = await Teams.find();

  const name = 'Amar';
  let options = { format: 'A4' };
  let file = {
    content: `<h1>Welcome to html-pdf-node</h1>
  <h2>${teams.map((team) => team.teamName)}</h2>
  <h2>${events.map((event) => event.eventName)}</h2>
  `,
  };
  const pdfFile = await pdf.generatePdf(file, options);
  res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader(
  //   'Content-Disposition',
  //   'inline; filename =" ' + 'TrialFile' + '"'
  // );

  res.send(pdfFile);

  // const invoicePath = path.join('data', 'invoices', 'trialFile');
  // const pdfDoc = new PDFDocument();
  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader(
  //   'Content-Disposition',
  //   'inline; filename =" ' + 'TrialFile' + '"'
  // );
  // pdfDoc.pipe(fs.createWriteStream(invoicePath));
  // pdfDoc.pipe(res);
  // pdfDoc.fontSize(30).text('Registered Teams', {
  //   underline: true,
  // });
  // pdfDoc.text('----------------------------------------------');

  // events.forEach((event) => {
  //   console.log(event.eventName);
  //   pdfDoc.fontSize(25).text(event.eventName);
  // });
  // teams.forEach((team) => {
  //   console.log(team.teamName);
  //   pdfDoc.fontSize(25).text(team.teamName);
  // });

  // pdfDoc.fontSize(14).text('Amar' + ' - ' + 'Narute' + ' x ' + '$' + '32');
  // pdfDoc.text('---');
  // pdfDoc.fontSize(20).text('Total Price: $20');

  // pdfDoc.end();
};

// const getIntraData = () => {
//   const firstYear = Members.countDocuments({ year: 1 });
//   const secondYear = Members.countDocuments({ year: 2 });
//   const thirdYear = Members.countDocuments({ year: 3 });
//   const fourthYear = Members.countDocuments({ year: 4 });
//   return [firstYear, secondYear, thirdYear, fourthYear];
// };
