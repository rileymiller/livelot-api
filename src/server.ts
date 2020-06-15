/*
 *   server.ts
 *   This file is the entry point for the API
 */
import { config } from 'dotenv'

import express from 'express'
import { createServer } from 'http'
import bodyParser from 'body-parser';
import ioserver, { Socket } from 'socket.io'

import { User } from "./api/models/userModel" //created User model loading here
import { Lot } from "./api/models/lotModel" //created Lot model loading here
import { LotLog } from "./api/models/lotLogModel" // create LotLog model loading here
import { Feedback } from "./api/models/feedbackModel" //created Feedback model loading here
import * as Mongoose from 'mongoose'
import { Camera } from './api/models/cameraModel'

import connect from './connect'

config()

const app = express()

const http = createServer(app)

const io = ioserver(http)

export const port = process.env.PORT || 3000

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
connect(process.env.MONGODB_URI || "mongodb://mongo:27017/LiveLotAPI")

// initialize socket.io connection
io.on(`connection`, (socket: Socket) => {
  console.log(`client connected: `, socket.id)

  /**
   * This messages is received whenever a socket is disconnected
   */
  socket.on(`disconnect`, async (reason: any) => {

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
  socket.on(`camera-connection`, async (payload: any) => {
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var { routes } = require("./api/routes/allRoutes"); //importing route
routes(app); //register the route

http.listen(port);

console.log("LiveLot RESTful API server started on: " + port);
