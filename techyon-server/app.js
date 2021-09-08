const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const public = require('./Routes/public');
dotenv.config();
var bodyParser = require('body-parser');

const teams = require('./Routes/PostTeams');
const events = require('./Routes/PostEvents');
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
app.use('/', public);

app.listen(3000, () => {
  console.log('app is running ');
});
