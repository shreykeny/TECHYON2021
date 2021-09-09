const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
var bodyParser = require('body-parser');

// const public = require('./Routes/public');
const teams = require('./Routes/PostTeams');
const events = require('./Routes/PostEvents');
const admin = require('./Routes/Admin');
//connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },

  () => {
    console.log('connected to DB');
  }
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/event', events);
app.use('/team', teams);
app.use('/admin', admin);

app.listen(3000, () => {
  console.log('app is running ');
});
