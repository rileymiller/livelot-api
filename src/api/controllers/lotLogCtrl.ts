/*
 *   lotLogCtrl.ts
 *   This file creates is the controller file to get information from the lotLog database
 */
import { Request, Response } from 'express';
import { LotLog as model } from '../models/lotLogModel'


export const getAllLogs = async (req: Request, res: Response) => {
  try {
    const logs = await model.find({});
    res.json(logs);
  } catch (error) {
    res.send(error);
  }
};

export const getLogsForLot = async (req: Request, res: Response) => {
  try {
    try {
      const logs = await model.find({
        "lotId": req.params.lotId
      })
      res.json(logs)
    } catch (error) {
      res.send(error);
    }
  } catch (error) {
    res.send(error);
  }
};

export const deleteAllLogs = async (req: Request, res: Response) => {
  try {
    await model.deleteMany({});
    res.json({ message: "Successfully deleted all lots" });
  } catch (error) {
    res.send(error);
  }
}

export const getLogsForLots = async (req: Request, res: Response) => {
  try {
    const lotIds = JSON.parse(req.body.lotIds);
    const logs = await model.find({ lotId: { $in: lotIds } });
    var entries = lotIds.map((lotId: string) => {
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
    });
    res.send(entries);
  } catch (error) {
    res.send(error);
  }
}
