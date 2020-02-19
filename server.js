/*
 *   server.js
 *   This file is the entry point for the API
 */
require("dotenv").config();

var app = require('express')(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  User = require("./api/models/userModel"), //created User model loading here
  Lot = require("./api/models/lotModel"), //created Lot model loading here
  LotIP = require("./api/models/lotIPAddressModel"),
  LotLog = require("./api/models/lotLogModel"), // create LotLog model loading here
  LotFunctions = require("./api/controllers/lotCtrl"),
  Feedback = require("./api/models/feedbackModel"), //created Feedback model loading here
  bodyParser = require("body-parser");

global.io = io; // so we can emit data via the socket in any controller

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://mongo:27017/LiveLotAPI",
  (err, Database) => {
    io.on("connection", (socket) => { });
  }
).then(() => console.log('MongoDB connected!'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/allRoutes"); //importing route
routes(app); //register the route

http.listen(port);

console.log("LiveLot RESTful API server started on: " + port);
