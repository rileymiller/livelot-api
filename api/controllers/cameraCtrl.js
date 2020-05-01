/*
 *   lotLogCtrl.js
 *   This file creates is the controller file to get information from the lotLog database
 */
"use strict";

var mongoose = require("mongoose"),
  Camera = mongoose.model("Camera")


/**
 * GET
 * 
 * Fetches all cameras
 */
exports.getAllCameras = async (req, res) => {
  try {
    const allCameras = await Camera.find({})

    res.status(200).json(allCameras);
  } catch (err) {
    res.status(500).send(err);
  }

};

/**
 * GET
 * 
 * Fetches a single camera when passed the cameraID in a 
 * GET request
 */
exports.getCamera = async (req, res) => {
  console.log(req.params)
  const { cameraID } = req.params
  console.log(`cameraID:`, cameraID)
  try {
    const camera = await Camera.findOne({ cameraID: cameraID })

    if (camera) {
      res.status(200).json({
        camera
      })
    } else {
      res.status(404).send(`Camera was not found`)
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(`Server error`)
  }
}

/**
 * DELETE
 * 
 * Deletes all cameras in collection
 */
exports.deleteAllCameras = async (req, res) => {
  try {
    await Camera.remove({})
    res.status(200).json({ message: "Successfully deleted all camera entries" });
  } catch (err) {
    res.status(500).send(err);
  }
}