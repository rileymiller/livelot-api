/*
*   userModel.js
*   This file creates the database schema for a 'user' object
*   Attributes can be added to the 'user' schema as needed
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
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
        type: String
    },
    phoneNumber: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);