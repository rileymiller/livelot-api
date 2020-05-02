/*
*   feedbackModel.ts
*   This file creates the database schema for a 'feedback' object
*   Attributes can be added to the 'feedback' schema as needed
*/
import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

export type FeedbackType = {
    date: Date,
    user: string,
    email: string,
    type: string,
    location: string,
    feedback: string
} & mongoose.Document

var FeedbackSchema = new Schema({
    date: {
        type: Date,
        requred: true
    },
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    feedback: {
        type: String,
        required: true
    }
});

export const Feedback = model<FeedbackType>('Feedback', FeedbackSchema)
