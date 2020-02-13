/*
 *   lotLogCtrl.js
 *   This file creates is the controller file to get information from the lotLog database
 */
"use strict";

var mongoose = require("mongoose"),
  Lot = mongoose.model("Lot"),
  LotLog = mongoose.model("LotLog")


exports.getAllLogs = (req, res) => {
  LotLog.find({}, (err, log) => {
    if (err) res.send(err);
    res.json(log);
  });
};

exports.getLogsForLot = (req, res) => {
  Lot.findById(req.params.lotId, (err, lot) => {
    if (err) res.send(err);
    // res.json(lot);

    LotLog.find({ "lotName": lot.lotName }, (err, log) => {
      if (err) res.send(err);
      res.json(log)
    })
  });
};