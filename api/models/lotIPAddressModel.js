/*
 *   lotIPAddressModel.js
 *   This file creates the database schema for a 'lotIP' object
 *   Attributes can be added to the 'lotIP' schema as needed
 */
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LotIPSchema = new Schema({
  lotName: {
    type: String,
    required: true
  },
  lotId: {
    type: String,
    required: true
  },
  IPv4: {
    type: String,
    required: true
  },
  IPv6: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("LotIP", LotIPSchema);
