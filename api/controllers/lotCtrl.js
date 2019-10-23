/*
 *   lotCtrl.js
 *   This file creates is the controller file to get information from the lot database
 */
"use strict";

var mongoose = require("mongoose"),
  Lot = mongoose.model("Lot");

exports.getAllLots = function(req, res) {
  Lot.find({}, function(err, lot) {
    if (err) res.send(err);
    res.json(lot);
  });
};

exports.createLot = function(req, res) {
  var newLot = new Lot(req.body);
  newLot.save(function(err, lot) {
    if (err) res.send(err);
    res.json(lot);
  });
};

exports.getLot = function(req, res) {
  Lot.findById(req.params.lotId, function(err, lot) {
    if (err) res.send(err);
    res.json(lot);
  });
};

exports.updateLot = function(req, res) {
  Lot.findOneAndUpdate(
    { _id: req.params.lotId },
    req.body,
    { new: true },
    function(err, lot) {
      if (err) res.send(err);
      res.json(lot);
    }
  );
};

exports.deleteLot = function(req, res) {
  Lot.remove(
    {
      _id: req.params.lotId
    },
    function(err, lot) {
      if (err) res.send(err);
      res.json({ message: "Lot successfully deleted" });
    }
  );
};

exports.increment = function(req, res) {
  // Get the lot by lotID
  Lot.findById(req.params.lotId, function(err, lot) {
    if (err) res.send(err);
    // increment the number of spots
    req.body.numSpots = lot.numSpots += 1;
    // update the number of spots in the lot
    Lot.findOneAndUpdate(
      { _id: req.params.lotId },
      req.body,
      { new: true },
      function(err, lot) {
        if (err) res.send(err);
        res.json(lot);
      }
    );
  });
};

exports.decrement = function(req, res) {
  // Get the lot by lotID
  Lot.findById(req.params.lotId, function(err, lot) {
    if (err) res.send(err);
    // decrement the number of spots
    req.body.numSpots = lot.numSpots -= 1;
    // update the number of spots in the lot
    Lot.findOneAndUpdate(
      { _id: req.params.lotId },
      req.body,
      { new: true },
      function(err, lot) {
        if (err) res.send(err);
        res.json(lot);
      }
    );
  });
};
