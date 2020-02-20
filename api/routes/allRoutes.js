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
  var auth = require("../middleware/auth")

  // user Routes
  app
    .route("/user")
    .get(user.getAllUsers)
    .post(user.createUser)
  // .delete(user.deleteAllUsers);s

  // This route is called after a token is grabbed from the login/ route
  app
    .route("/user/me")
    .get(auth, user.me)


  app
    .route("/user/:userId")
    .get(user.getUser)
    .put(user.updateUser)
  // .delete(user.deleteUser);

  // Route used to signup a user
  app
    .route("/signup")
    .post(user.signup)

  // Route used to login a user
  app
    .route('/login')
    .post(user.login)

  app
    .route('/resetPassword')
    .post(user.resetPassword)


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
