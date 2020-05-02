/*
 *   lotLogModel.ts
 *   This file creates the database schema for a 'log' object
 *   Attributes can be added to the 'log' schema as needed
 */
import mongoose from 'mongoose'
import { Schema, model, Model } from 'mongoose'

import { Lot, LotType } from './lotModel'

export type LotLogType = {
  lotId: string
  totalSpots: number
  time: Date
  didCarEnter: Boolean
} & Pick<LotType, 'lotName' | 'numSpots' | 'totalSpots'> & mongoose.Document

var LotLogSchema = new Schema({
  lotName: {
    type: String,
    required: true
  },
  lotId: {
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
  time: {
    type: Date,
    required: true
  },
  didCarEnter: {
    type: Boolean,
    required: true
  }
})

export const LotLog = model<LotLogType>("LotLog", LotLogSchema);
