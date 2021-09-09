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
const { connect } = require('../Routes/Admin');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('Amar Narute');
};
