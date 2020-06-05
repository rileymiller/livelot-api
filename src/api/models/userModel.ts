/*
*   userModel.ts
*   This file creates the database schema for a 'user' object
*   Attributes can be added to the 'user' schema as needed
*/
import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

export type UserType = {
    username: string,
    password: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    createDate: Date
} & mongoose.Document

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

export const User = model<UserType>('User', UserSchema);
