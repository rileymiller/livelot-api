/*
 *   lotIPAddressModel.js
 *   This file creates the database schema for a 'lotIP' object
 *   Attributes can be added to the 'lotIP' schema as needed
 */
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CameraSchema = new Schema({
  lotName: {
    type: String,
    required: true
  },
  cameraID: {
    type: String,
    required: true
  },
  ipv4: {
    type: String,
    required: true
  },
  ipv6: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model("Camera", CameraSchema);
