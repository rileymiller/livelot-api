/*
 *   lotModel.js
 *   This file creates the database schema for a 'lot' object
 *   Attributes can be added to the 'lot' schema as needed
 */
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LotSchema = new Schema({
  lotName: {
    type: String,
    required: true
  },
  numSpots: {
    type: Number,
    required: true
  },
  totalSpots: {
    type: Number,
    required: true
  },
  lotAddress: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Lot", LotSchema);
