/*
 *   lotLogModel.js
 *   This file creates the database schema for a 'log' object
 *   Attributes can be added to the 'log' schema as needed
 */
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LotLogSchema = new Schema({
  lotName: {
    type: String,
    required: true
  },
  lotId: {
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
  time: {
    type: Date,
    required: true
  },
  didCarEnter: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model("LotLog", LotLogSchema);
