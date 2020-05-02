/*
 *   lotCtrl.ts
 *   This file creates is the controller file to get information from the lot database
 */
import { Request, Response, NextFunction, response } from 'express';
import mongoose from 'mongoose';
import Lot from '../models/lotModel';
import lotModel from '../models/lotModel';

// var LotLog = mongoose.model("LotLog")

export const getAllLots = async (req: Request, res: Response) => {
  try {
    const lots = await Lot.find({});
    res.json(lots);
  } catch (error) {
    res.send(error);
  }
};

export const deleteAllLots = async (req: Request, res: Response) => {
  try {
    await Lot.remove({});
    res.json({ message: 'Deleted all lots' });
  } catch (error) {
    res.send(error);
  }
};

export const createLot = async (req: Request, res: Response) => {
  var newLot = new Lot({ ...req.body, lastUpdated: Date() });
  try {
    const savedLot = await newLot.save();
    res.json(savedLot);
  } catch (error) {
    res.send(error);
  }
};

export const getLot = async (req: Request, res: Response) => {
  try {
    const lot = await Lot.findById(req.params.lotId);
    res.json(lot);
  } catch (error) {
    res.send(error);
  }
};

export const updateLot = async (req: Request, res: Response) => {
  try {
    const lot = await Lot.findOneAndUpdate(
      { _id: req.params.lotId },
      { ...req.body, lastUpdated: Date() },
      { new: true }
    );
    res.json(lot);
  } catch (error) {
    res.send(error);
  }
};

export const deleteLot = async (req: Request, res: Response) => {
  try {
    await Lot.remove({ _id: req.params.lotId });
    res.json({ message: "Lot successfully deleted" });
  } catch (error) {
    res.send(error);
  }
};

// // increments numSpots when a car goes
// exports.carOut = (req, res) => {
//   // Get the lot by lotID
//   Lot.findById(req.params.lotId, (err, lot) => {
//     if (err) res.send(err);
//     // increment the number of spots
//     req.body.numSpots = lot.numSpots += 1;
//     // update the number of spots in the lot
//     Lot.findOneAndUpdate(
//       { _id: req.params.lotId },
//       { ...req.body, lastUpdated: Date() },
//       { new: true },
//       (err, lot) => {
//         if (err) res.send(err);
//         // log that a car left the lot
//         var log = new LotLog({
//           lotName: lot.lotName,
//           lotId: req.params.lotId,
//           numSpots: lot.numSpots,
//           totalSpots: lot.totalSpots,
//           time: Date(),
//           didCarEnter: false
//         });

//         log.save((err, log) => {
//           if (err) res.send(err);

//           global.io.emit('Car Out', lot);
//           res.json(lot);
//         });
//       }
//     );

//   });
// };

// // decrements numSpots when a car comes in
// exports.carIn = (req, res) => {
//   // Get the lot by lotID
//   Lot.findById(req.params.lotId, (err, lot) => {
//     if (err) res.send(err);
//     // decrement the number of spots
//     req.body.numSpots = lot.numSpots -= 1;
//     // update the number of spots in the lot
//     Lot.findOneAndUpdate(
//       { _id: req.params.lotId },
//       { ...req.body, lastUpdated: Date() },
//       { new: true },
//       (err, lot) => {
//         if (err) res.send(err);
//         // log that a car entered the lot
//         var log = new LotLog({
//           lotName: lot.lotName,
//           lotId: req.params.lotId,
//           numSpots: lot.numSpots,
//           totalSpots: lot.totalSpots,
//           time: Date(),
//           didCarEnter: true
//         });

//         log.save((err, log) => {
//           if (err) res.send(err);

//           global.io.emit('Car In', lot);
//           res.json(lot);
//         });
//       }
//     );
//   });
// };
