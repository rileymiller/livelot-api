/*
 *   lotLogCtrl.ts
 *   This file creates is the controller file to get information from the lotLog database
 */
import { Request, Response } from 'express';
import { Camera as model} from '../models/cameraModel'


/**
 * GET
 * 
 * Fetches all cameras
 */
export const getAllCameras = async (req: Request, res: Response) => {
  try {
    const allCameras = await model.find({})

    res.status(200).json(allCameras);
  } catch (err) {
    res.status(500).send(err);
  }

};

/**
 * GET
 * 
 * Fetches a single camera when passed the cameraID in a 
 * GET request
 */
export const getCamera = async (req: Request, res: Response) => {
  console.log(req.params)
  const { cameraID } = req.params
  console.log(`cameraID:`, cameraID)
  try {
    const camera = await model.findOne({ cameraID: cameraID })

    if (camera) {
      res.status(200).json({
        camera
      })
    } else {
      res.status(404).send(`Camera was not found`)
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(`Server error`)
  }
}

/**
 * DELETE
 * 
 * Deletes all cameras in collection
 */
export const deleteAllCameras = async (req: Request, res: Response) => {
  try {
    await model.remove({})
    res.status(200).json({ message: "Successfully deleted all camera entries" });
  } catch (err) {
    res.status(500).send(err);
  }
}