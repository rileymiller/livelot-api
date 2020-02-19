/*
 *   lotLogCtrl.js
 *   This file creates is the controller file to get information from the lotLog database
 */
"use strict";

var mongoose = require("mongoose"),
  Lot = mongoose.model("Lot"),
  LotIP = mongoose.model("LotIP")


exports.getAllLotIPs = (req, res) => {
  LotIP.find({}, (err, log) => {
    if (err) res.send(err);
    res.json(log);
  });
};

exports.logLotIPAddress = (req, res) => {
  const { lotId } = req.body
  Lot.findById(lotId, (err, lot) => {
    if (err) res.status(400).json({
      msg: "Lot doesn't exist"
    })

    var lotIP = new LotIP(req.body);
    lotIP.save((err, lotIP) => {
      if (err) res.send(err);
      res.json(lotIP);
    });
  })
}

exports.getLotIPForLot = (req, res) => {
  Lot.findById(req.params.lotId, (err, lot) => {
    if (err) res.send(err);
    LotIP.find({ "lotId": lot._id }, (err, lotIP) => {
      if (err) res.send(err);
      res.json(lotIP)
    })
  });
};

exports.deleteAllLotIPs = (req, res) => {
  LotIP.remove({}, (err, lot) => {
    if (err) res.send(err);
    res.json({ message: "Successfully deleted all lot IP address entries" });
  })
}