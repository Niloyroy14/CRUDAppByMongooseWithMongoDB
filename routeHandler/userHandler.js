const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = new mongoose.model("User", userSchema);

//SignUP
router.post('/signup', async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashPassword
    });
    try {
        let data = await newUser.save();
        if (data) {
            res.status(200).json({
                message: 'SignUp was successfully',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: 'Opps! SignUp failed!',
        });
    }
});


//LogIn
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                //generate token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.JWT_SECRETE, { expiresIn: '1h' });

                if (token) {
                    res.status(200).json({
                        access_token: token,
                        message: "Login Successfull!"
                    });
                } else {
                    res.status(401).json({
                        error: 'Login failed!',
                    });
                }

            } else {
                res.status(401).json({
                    error: 'Authentication failed!',
                });
            }
        } else {
            res.status(401).json({
                error: 'Authentication failed!',
            });
        }
    } catch (err) {
        res.status(401).json({
            error: 'Authentication failed!',
        });
    }
});

//GET All Users
router.get('/all', async (req, res) => {
    try {
        const users = await User.find()
            .populate("todos");
        if (users) {
            res.status(200).json({
                result: users,
                message: 'Success',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'There waas a Server side error',
        });
    }
});


module.exports = router;