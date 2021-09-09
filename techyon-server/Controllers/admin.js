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
const bcrypt = require('bcryptjs');
const { reset } = require('nodemon');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

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
