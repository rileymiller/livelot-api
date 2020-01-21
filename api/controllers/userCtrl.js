/*
*   userCtrl.js
*   This file creates is the controller file to get information from the user database
*/
'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.getAllUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.createUser = (req, res) => {
    var newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.getUser = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.deleteUser = (req, res) => {
    User.remove({
        _id: req.params.userId
    }, (err, user) => {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};
