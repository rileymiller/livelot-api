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

exports.deleteAllUsers = (req, res) => {
    User.remove({}, (err, user) => {
        if (err)
            res.send(err);
        res.json({ message: 'Deleted all users' });
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

exports.login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (!user)
            return res.status(400).json({
                message: "User Does Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password!"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

exports.resetPassword = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password, newPassword, confirmNewPassword } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (!user)
            return res.status(400).json({
                message: "User Does Not Exist"
            });

        if (!password)
            return res.status(400).json({
                message: "No password entered, check client validation"
            })

        if (!newPassword)
            return res.status(400).json({
                message: "New password not entered, check client validation"
            })

        if (!confirmNewPassword)
            return res.status(400).json({
                message: "Confirm password not entered, check client validation"
            })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password!"
            });

        if (newPassword !== confirmNewPassword)
            return res.status(400).json({
                message: "Passwords do not match"
            })

        try {

            let updatedUser = await User.findOneAndUpdate({ username: user.username }, { password: newPassword }, { new: true })
            console.log('updatedUser.password pre hash', updatedUser.password)
            const salt = await bcrypt.genSalt(10);
            updatedUser.password = await bcrypt.hash(updatedUser.password, salt);

            console.log('updatedUser.password', updatedUser.password)
            await updatedUser.save();

            const payload = {
                user: {
                    id: updatedUser.id
                }
            };

            jwt.sign(
                payload,
                "secret",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (e) {
            console.error(e)
            res.status(500).json({
                message: "Server Error"
            });
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

exports.me = async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
}