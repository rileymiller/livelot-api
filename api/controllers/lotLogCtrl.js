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
    LotLog.find({ "lotId": lot._id }, (err, log) => {
      if (err) res.send(err);
      res.json(log)
    })
  });
};

exports.deleteAllLogs = (req, res) => {
  LotLog.remove({}, (err, lot) => {
    if (err) res.send(err);
    res.json({ message: "Successfully deleted all lots" });
  })
}

exports.getLogsForLots = async (req, res) => {
  var lotIds = JSON.parse(req.body.lotIds)

  LotLog.find({ lotId: { $in: lotIds } }, (err, logs) => {
    if (err) res.send(err)
    var entries = lotIds.map((lotId) => {
      return (
        {
          id: lotId,
          lots: [
            ...logs.filter((log) => {
              return log.lotId === lotId
            })
          ]
        }
      )
    })

    res.send(entries)
  })
}