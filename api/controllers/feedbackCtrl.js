/*
*   feedbackCtrl.js
*   This file creates is the controller file to get information from the feedback database
*/
'use strict';

var mongoose = require('mongoose'),
    Feedback = mongoose.model('Feedback');

exports.getAllFeedback = (req, res) => {
    Feedback.find({}, (err, feedback) => {
        if (err)
            res.send(err);
        res.json(feedback);
    });
};

exports.createFeedback = (req, res) => {
    req.body.date = new Date();
    var newFeedback = new Feedback(req.body);
    newFeedback.save((err, feedback) => {
        if (err)
            res.send(err);
        res.json(feedback);
    });
};
