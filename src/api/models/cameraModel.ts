/*
 *   cameraModel.ts
 *   This file creates the database schema for a 'Camera' object
 *   Attributes can be added to the 'Camera' schema as needed
 */
import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'
import { LotType } from './lotModel'
type CameraType = {
  cameraID: string
  ipv4: string
  ipv6: string
  online: boolean
} & Pick<LotType, 'lotName'> & mongoose.Document

const CameraSchema = new Schema({
  lotName: {
    type: String,
    required: true
  },
  cameraID: {
    type: String,
    required: true
  },
  ipv4: {
    type: String,
    required: true
  },
  ipv6: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    required: true
  }
})

export const Camera = model<CameraType>(`Camera`, CameraSchema);
