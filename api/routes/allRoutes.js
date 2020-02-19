/*
 *   allRoutes.js
 *   This file sets up the routes for the LiveLotAppAPI
 *   Initially this file just has routes for the 'user' object, 'lot' object, and 'feedback' object, but all the routes for the application
 *   will eventually be written in here once the schemas and controllers are created.
 */
"use strict";
module.exports = (app) => {
  var user = require("../controllers/userCtrl");
  var lot = require("../controllers/lotCtrl");
  var feedback = require("../controllers/feedbackCtrl");
  var log = require("../controllers/lotLogCtrl");
  var lotIP = require("../controllers/lotIPCtrl")

  // user Routes
  app
    .route("/user")
    .get(user.getAllUsers)
    .post(user.createUser);

  app
    .route("/user/:userId")
    .get(user.getUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

  // lot Routes
  app
    .route("/lot")
    .get(lot.getAllLots)
    .post(lot.createLot);

  app
    .route("/lot/:lotId")
    .get(lot.getLot)
    .put(lot.updateLot)
    .delete(lot.deleteLot);

  app
    .route("/lotIP")
    .get(lotIP.getAllLotIPs)
    .delete(lotIP.deleteAllLotIPs)
    .post(lotIP.logLotIPAddress)

  app
    .route("/lotIP/:lotId")
    .get(lotIP.getLotIPForLot)

  // log route(s)
  app
    .route("/log")
    .get(log.getAllLogs)
    .delete(log.deleteAllLogs)
    .post(log.getLogsForLots)

  // get log for route
  app
    .route("/log/:lotId")
    .get(log.getLogsForLot)

  // increment and decrement lots by ID
  app.route("/lot/:lotId/carOut").put(lot.carOut);
  app.route("/lot/:lotId/carIn").put(lot.carIn);

  // feedback Routes
  app
    .route("/feedback")
    .get(feedback.getAllFeedback)
    .post(feedback.createFeedback);
};
