const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const teams = require('./Routes/PostTeams');
const events = require('./Routes/PostEvents');
const admin = require('./Routes/Admin');

//connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },

  () => {
    console.log('connected to DB');
  }
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//bodyParser is deprecated. Changed it to express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/event', events);
app.use('/team', teams);
app.use('/admin', admin);

//Error handler. See admin controller to check how to use this error handler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const msg = error.message;
  const data = error.data;
  res.status(status).json({ msg, data });
});

app.listen(3000, () => {
  console.log('app is running ');
});
