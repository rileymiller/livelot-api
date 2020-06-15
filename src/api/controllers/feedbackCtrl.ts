/*
*   feedbackCtrl.js
*   This file creates is the controller file to get information from the feedback database
*/
import { Request, Response } from 'express';
import { Feedback as model} from '../models/feedbackModel'

export const getAllFeedback = async (req: Request, res: Response) => {
    try {
        const feedback = await model.find({});
        res.json(feedback);
    } catch (error) {
        res.send(error);
    }
};

export const createFeedback = async (req: Request, res: Response) => {
    try {
        req.body.date = new Date();
        const newFeedback = new model(req.body);
        const savedFeedback = await newFeedback.save();
        res.json(savedFeedback);
    } catch (error) {
        res.send(error);
    }
};
