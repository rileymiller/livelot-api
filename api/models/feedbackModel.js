/*
*   feedbackModel.js
*   This file creates the database schema for a 'feedback' object
*   Attributes can be added to the 'feedback' schema as needed
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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

module.exports = mongoose.model('Feedback', FeedbackSchema);
