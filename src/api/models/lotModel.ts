/*
 *   lotModel.ts
 *   This file creates the database schema for a 'lot' object
 *   Attributes can be added to the 'lot' schema as needed
 */
import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

export type Lot = {
  lotName: string,
  numSpots: number,
  totalSpots: number,
  lotAddress: string,
  lotStatus: string,
  lastUpdated: Date
} & mongoose.Document


const LotSchema = new Schema({
  lotName: {
    type: String,
    required: true
  },
  numSpots: {
    type: Number,
    required: true
  },
  totalSpots: {
    type: Number,
    required: true
  },
  lotAddress: {
    type: String,
    required: true
  },
  lotStatus: {
    type: Boolean,
    required: true
  },
  lastUpdated: {
    type: Date,
    required: true
  }
});

export default model<Lot>(`Lot`, LotSchema);
