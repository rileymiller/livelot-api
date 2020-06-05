/*
 *   allRoutes.ts
 *   This file sets up the routes for the LiveLotAppAPI
 *   Initially this file just has routes for the 'user' object, 'lot' object, and 'feedback' object, but all the routes for the application
 *   will eventually be written in here once the schemas and controllers are created.
 */
import {
  getAllUsers,
  createUser,
  deleteAllUsers,
  me,
  getUser,
  updateUser,
  deleteUser,
  signup,
  login,
  resetPassword
} from "../controllers/userCtrl";
import {
  getAllLots,
  createLot,
  deleteAllLots,
  getLot,
  updateLot,
  deleteLot,
  carIn,
  carOut
} from "../controllers/lotCtrl";
import {
  getAllFeedback,
  createFeedback
} from "../controllers/feedbackCtrl";
import {
  getAllLogs,
  deleteAllLogs,
  getLogsForLot,
  getLogsForLots
} from "../controllers/lotLogCtrl";
import {
  getAllCameras,
  deleteAllCameras,
  getCamera,
  createCamera
} from "../controllers/cameraCtrl";
import auth from "../middleware/auth";

import { Application } from 'express'

export const routes = (app: Application) => {
  console.log('in routes');
  // user Routes
  app
    .route(`/user`)
    .get(getAllUsers)
    .post(createUser)
    .delete(deleteAllUsers);

  // This route is called after a token is grabbed from the login/ route
  app
    .route(`/user/me`)
    .get(auth, me)


  app
    .route(`/user/:userId`)
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

  // Route used to signup a user
  app
    .route(`/signup`)
    .post(signup)

  // Route used to login a user
  app
    .route('/login')
    .post(login)

  app
    .route('/resetPassword')
    .post(resetPassword)


  // lot Routes
  app
    .route(`/lot`)
    .get(getAllLots)
    .post(createLot)
    .delete(deleteAllLots);

  app
    .route(`/lot/:lotId`)
    .get(getLot)
    .put(updateLot)
    .delete(deleteLot);

  app
    .route(`/cameras`)
    .get(getAllCameras)
    .delete(deleteAllCameras)

  app
    .route(`/camera`)
    .post(createCamera)


  app
    .route(`/camera/:cameraID`)
    .get(getCamera)

  // log route(s)
  app
    .route(`/log`)
    .get(getAllLogs)
    .delete(deleteAllLogs)
    .post(getLogsForLots)

  // get log for route
  app
    .route(`/log/:lotId`)
    .get(getLogsForLot)

  // increment and decrement lots by ID
  app.route(`/lot/:lotId/carOut`).put(carOut);
  app.route(`/lot/:lotId/carIn`).put(carIn);

  // feedback Routes
  app
    .route(`/feedback`)
    .get(getAllFeedback)
    .post(createFeedback);
};
