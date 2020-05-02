/*
*   userCtrl.ts
*   This file creates is the controller file to get information from the user database
*/

import mongoose from 'mongoose'
import { User as model } from '../models/userModel'
import { Request, Response } from 'express'


import { check, validationResult } from 'express-validator'

import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'

export const getAllUsers = async (_: Request, res: Response) => {
    try {
        const user = await model.remove({})
        res.json(user)
    } catch (error) {
        res.send(error)
    }
};

export const deleteAllUsers = async (_: Request, res: Response) => {

    try {
        await model.remove({})
        res.status(200).json({ message: 'Deleted all users' });
    } catch (error) {
        res.status(500).send(error)
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await new model(req.body);

        await newUser.save()
        res.json(newUser);
    } catch (error) {
        res.send(error);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = model.findById(req.params.userId)
        res.json(user);
    } catch (error) {
        res.send(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await model.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })

        res.json(user);
    } catch (error) {
        res.send(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await model.remove({
            _id: req.params.userId
        })

        res.json({ message: 'OK: 200 User successfully deleted' });
    } catch (error) {
        res.send(error);
    }
};

export const signup = async (req: Request, res: Response) => {

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

        let user = await model.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                message: "Error: 400 - User Already Exists"
            });
        }

        user = new model({
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
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error: 500 - Error in Saving");
    }
}

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password } = req.body;
    try {
        let user = await model.findOne({
            email
        });
        if (!user)
            return res.status(400).json({
                message: "Error: 400 - User Does Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Error: 400 - Incorrect Password!"
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
            message: "Error: 500 - Server Error"
        });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, password, newPassword, confirmNewPassword } = req.body;
    try {
        let user = await model.findOne({
            email
        });
        if (!user)
            return res.status(400).json({
                message: "Error: 400 - User Does Not Exist"
            });

        if (!password)
            return res.status(400).json({
                message: "Error: 400 - No password entered, check client validation"
            })

        if (!newPassword)
            return res.status(400).json({
                message: "Error: 400 - New password not entered, check client validation"
            })

        if (!confirmNewPassword)
            return res.status(400).json({
                message: "Error: 400 - Confirm password not entered, check client validation"
            })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Error: 400 - Incorrect Password!"
            });

        if (newPassword !== confirmNewPassword)
            return res.status(400).json({
                message: "Error: 400 - Passwords do not match"
            })


        let updatedUser = await model.findOneAndUpdate({ username: user.username }, { password: newPassword }, { new: true })
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(updatedUser.password, salt);

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
        console.error(e);
        res.status(500).json({
            message: "Error: 500 - Server Error"
        });
    }
}

export const me = async (req: Request, res: Response) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        // const user = await model.findById(req.user.id); this is the old implementation in case this breaks!!
        const user = await model.findById(req.headers[`user`])
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: "Error: 500 - Error in Fetching user" });
    }
}