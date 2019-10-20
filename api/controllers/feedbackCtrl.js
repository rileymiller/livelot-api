/*
*   feedbackCtrl.js
*   This file creates is the controller file to get information from the feedback database
*/
'use strict';

var mongoose = require('mongoose'),
    Feedback = mongoose.model('Feedback');

exports.getAllFeedback = function (req, res) {
    Feedback.find({}, function (err, feedback) {
        if (err)
            res.send(err);
        res.json(feedback);
    });
};

exports.createFeedback = function (req, res) {
    req.body.date = new Date();
    var newFeedback = new Feedback(req.body);
    newFeedback.save(function (err, feedback) {
        if (err)
            res.send(err);
        res.json(feedback);
    });
};
