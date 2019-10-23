/*
 *   allRoutes.js
 *   This file sets up the routes for the LiveLotAppAPI
 *   Initially this file just has routes for the 'user' object, 'lot' object, and 'feedback' object, but all the routes for the application
 *   will eventually be written in here once the schemas and controllers are created.
 */
"use strict";
module.exports = function(app) {
  var user = require("../controllers/userCtrl");
  var lot = require("../controllers/lotCtrl");
  var feedback = require("../controllers/feedbackCtrl");

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

  // increment and decrement lots by ID
  app.route("/increment/:lotId").put(lot.increment);
  app.route("/decrement/:lotId").put(lot.decrement);

  // feedback Routes
  app
    .route("/feedback")
    .get(feedback.getAllFeedback)
    .post(feedback.createFeedback);
};
