/*
 *   lotCtrl.js
 *   This file creates is the controller file to get information from the lot database
 */
"use strict";

var mongoose = require("mongoose"),
  Lot = mongoose.model("Lot");

var LotLog = mongoose.model("LotLog")

exports.getAllLots = (req, res) => {
  Lot.find({}, (err, lot) => {
    if (err) res.send(err);
    res.json(lot);
  });
};

exports.createLot = (req, res) => {
  var newLot = new Lot(req.body);
  newLot.save((err, lot) => {
    if (err) res.send(err);
    res.json(lot);
  });
};

exports.getLot = (req, res) => {
  Lot.findById(req.params.lotId, (err, lot) => {
    if (err) res.send(err);
    res.json(lot);
  });
};

exports.updateLot = (req, res) => {
  Lot.findOneAndUpdate(
    { _id: req.params.lotId },
    req.body,
    { new: true },
    function (err, lot) {
      if (err) res.send(err);
      res.json(lot);
    }
  );
};

exports.deleteLot = (req, res) => {
  Lot.remove(
    {
      _id: req.params.lotId
    },
    function (err, lot) {
      if (err) res.send(err);
      res.json({ message: "Lot successfully deleted" });
    }
  );
};

// increments numSpots when a car goes
exports.carOut = (req, res) => {
  // Get the lot by lotID
  Lot.findById(req.params.lotId, (err, lot) => {
    if (err) res.send(err);
    // increment the number of spots
    req.body.numSpots = lot.numSpots += 1;
    // update the number of spots in the lot
    Lot.findOneAndUpdate(
      { _id: req.params.lotId },
      req.body,
      { new: true },
      (err, lot) => {
        if (err) res.send(err);
        // log that a car left the lot
        var log = new LotLog({
          _id: lot.lotId,
          lotName: lot.lotName,
          numSpots: lot.numSpots,
          totalSpots: lot.totalSpots,
          time: Date(),
          didCarEnter: false
        });

        log.save((err, log) => {
          if (err) res.send(err);

          global.io.emit('Car Out', lot);
          res.json(lot);
        });
      }
    );

  });
};

// decrements numSpots when a car comes in
exports.carIn = (req, res) => {
  // Get the lot by lotID
  Lot.findById(req.params.lotId, (err, lot) => {
    if (err) res.send(err);
    // decrement the number of spots
    req.body.numSpots = lot.numSpots -= 1;
    // update the number of spots in the lot
    Lot.findOneAndUpdate(
      { _id: req.params.lotId },
      req.body,
      { new: true },
      (err, lot) => {
        if (err) res.send(err);
        // log that a car entered the lot
        var log = new LotLog({
          _id: lot.lotId,
          lotName: lot.lotName,
          numSpots: lot.numSpots,
          totalSpots: lot.totalSpots,
          time: Date(),
          didCarEnter: true
        });

        log.save((err, log) => {
          if (err) res.send(err);

          global.io.emit('Car In', lot);
          res.json(lot);
        });
      }
    );
  });
};
