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
};
