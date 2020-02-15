/*
*   userCtrl.js
*   This file creates is the controller file to get information from the user database
*/
'use strict';


var mongoose = require('mongoose'),
    User = mongoose.model('User');

const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// exports.signupValidation = [
//     check("username", "Please Enter a Valid Username")
//         .not()
//         .isEmpty(),
//     check("email", "Please enter a valid email").isEmail(),
//     check("password", "Please enter a valid password").isLength({
//         min: 6
//     })
// ]
exports.signup = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        username,
        email,
        password
    } = req.body;
    try {

        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
            expiresIn: 10000
        },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
}

exports.login = (req, res) => {

}