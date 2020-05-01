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
  Camera = require("./api/models/cameraModel"),
  LotLog = require("./api/models/lotLogModel"), // create LotLog model loading here
  LotFunctions = require("./api/controllers/lotCtrl"),
  Feedback = require("./api/models/feedbackModel"), //created Feedback model loading here
  bodyParser = require("body-parser");

global.io = io; // so we can emit data via the socket in any controller

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

/**
 * This map maps the socket id to the camera id for each connected node. This 
 * will allow us to toggle the Camera to be online when a node connects and toggle
 * it to be offline when a Camera disconnects from the server.
 */
let socketMap = new Map()

/**
 * This connection connects to our MongDB collections and also holds the
 * wrapper for our Socket.io web sockets for field node connections
 */
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://mongo:27017/LiveLotAPI",
  (err, Database) => {
    io.on(`connection`, (socket) => {
      console.log(`client connected: `, socket.id)

      /**
       * This messages is received whenever a socket is disconnected
       */
      socket.on(`disconnect`, async (reason) => {

        console.log(`disconnected socket#:`, socket.id)

        const cameraID = socketMap.get(socket.id)

        console.log(`cameraID:`, cameraID)


        try {
          const updatedCamera = await Camera.findOneAndUpdate({ cameraID: cameraID }, { online: false }, { new: true })

          console.log(`Disconnected Camera updated`, updatedCamera)
        } catch (err) {
          console.log(`Error updating the disconnected camera's status`, err)
        }
      });

      /**
       * This message is received whenever a node emits a `camera-connection` message
       */
      socket.on(`camera-connection`, async (payload) => {
        console.log(`Camera trying to connect`)

        try {
          const connectedCamera = await Camera.findOneAndUpdate({ cameraID: payload.cameraID }, payload, { new: true, upsert: true })

          console.log(`Camera successfully connected`, connectedCamera)

          socket.emit(`camera-update-success`, { msg: `Camera was added successfully`, camera: connectedCamera })

          socketMap.set(socket.id, connectedCamera.cameraID)
        } catch (err) {
          console.log(`Camera failed to connect, error:`, err)

          socket.emit(`camera-update-fail`, { msg: `Camera failed to connect`, error: err })
        }
      })
    });
  }
).then(() => console.log('MongoDB connected!'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/allRoutes"); //importing route
routes(app); //register the route

http.listen(port);

console.log("LiveLot RESTful API server started on: " + port);
