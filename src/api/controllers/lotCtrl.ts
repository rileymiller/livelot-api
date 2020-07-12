/*
 *   lotCtrl.ts
 *   This file creates is the controller file to get information from the lot database
 */
import { Request, Response } from 'express';
import { Lot as model, LotType } from '../models/lotModel';

import { LotLog } from '../models/lotLogModel'

export const getAllLots = async (req: Request, res: Response) => {
  try {
    const lots = await model.find({});
    res.json(lots);
  } catch (error) {
    res.send(error);
  }
};

export const deleteAllLots = async (req: Request, res: Response) => {
  try {
    await model.deleteMany({});
    res.json({ message: 'Deleted all lots' });
  } catch (error) {
    res.send(error);
  }
};

export const createLot = async (req: Request, res: Response) => {
  try {
    var newLot = new model({ ...req.body, lastUpdated: Date() });
    const savedLot = await newLot.save();
    res.json(savedLot);
  } catch (error) {
    res.send(error);
  }
};

export const getLot = async (req: Request, res: Response) => {
  try {
    const lot = await model.findById(req.params.lotId);
    res.json(lot);
  } catch (error) {
    res.send(error);
  }
};

export const updateLot = async (req: Request, res: Response) => {
  if (req.body._id) {
    res.status(403).end('Cannot modify the _id for a lot that already exists');
  } else {
    try {
    
      if (req.body._id) console.log(req.body._id);
      const lot = await model.findOneAndUpdate(
        { _id: req.params.lotId },
        { ...req.body, lastUpdated: Date() },
        { new: true }
      );
      res.status(200).json(lot);
    } catch (error) {
      res.send(error);
    }
  }
};

export const deleteLot = async (req: Request, res: Response) => {
  try {
    await model.deleteOne({ _id: req.params.lotId });
    res.json({ message: `Lot ${req.params.lotId} successfully deleted` });
  } catch (error) {
    res.send(error);
  }
};

export const logLotUpdate = async (lot: LotType, didCarEnter: boolean, lotId: string) => {
  // log that a car left the lot
  const log = new LotLog({
    lotName: lot.lotName,
    lotId: lotId,
    numSpots: lot.numSpots,
    totalSpots: lot.totalSpots,
    time: Date(),
    didCarEnter: didCarEnter
  });

  await log.save()
}


// increments numSpots when a car goes
export const carOut = async (req: Request, res: Response) => {
  // Get the lot by lotID
  try {
    const lotToUpdate = await model.findById(req.params.lotId)

    // increment the number of spots
    req.body.numSpots = lotToUpdate.numSpots -= 1

    try {
      // update the number of spots in the lot
      const updatedLot = await model.findOneAndUpdate(
        {
          _id: req.params.lotId
        },
        {
          ...req.body,
          lastUpdated: Date()
        },
        {
          new: true
        }
      )


      await logLotUpdate(updatedLot, false, req.params.lotId)
      const io = req.app.get(`socketio`)

      io.emit(`Car Out`, updatedLot)
      res.json(updatedLot)
    } catch (error) {
      // TODO: add correct status code
      res.send(error)
    }

  } catch (error) {
    // TODO: add correct status code
    res.send(error)
  }

};

// decrements numSpots when a car goes
export const carIn = async (req: Request, res: Response) => {
  // Get the lot by lotID
  try {
    const lotToUpdate = await model.findById(req.params.lotId)

    // decrement the number of spots
    req.body.numSpots = lotToUpdate.numSpots += 1

    try {
      // update the number of spots in the lot
      const updatedLot = await model.findOneAndUpdate(
        {
          _id: req.params.lotId
        },
        {
          ...req.body,
          lastUpdated: Date()
        },
        {
          new: true
        }
      )


      await logLotUpdate(updatedLot, true, req.params.lotId)
      const io = req.app.get(`socketio`)

      io.emit(`Car In`, updatedLot)
      res.json(updatedLot)
    } catch (error) {
      // TODO: add correct status code
      res.send(error)
    }

  } catch (error) {
    // TODO: add correct status code
    res.send(error)
  }

};
