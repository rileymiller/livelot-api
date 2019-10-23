/*
 *   server.js
 *   This file is the entry point for the API
 */
require("dotenv").config();

var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  socket = require("socket.io"),
  User = require("./api/models/userModel"), //created User model loading here
  Lot = require("./api/models/lotModel"), //created Lot model loading here
  LotFunctions = require("./api/controllers/lotCtrl"),
  Feedback = require("./api/models/feedbackModel"), //created Feedback model loading here
  bodyParser = require("body-parser");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/livelotapi",
  (err, Database) => {
    const io = socket.listen(Database);

    // emit events when a lot is incremented or decremented
    io.on("connection", function(socket) {
      socket.on("lot incremented", function(lot) {
        LotFunctions.increment(lot, function(res) {
          if (res) {
            io.emit("lot incremented", lot);
          } else {
            io.emit("error");
          }
        });
      });
      socket.on("lot decremented", function(lot) {
        LotFunctions.decrement(lot, function(res) {
          if (res) {
            io.emit("lot decremented", lot);
          } else {
            io.emit("error");
          }
        });
      });
    });
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/allRoutes"); //importing route
routes(app); //register the route

app.listen(port);

console.log("LiveLot RESTful API server started on: " + port);
