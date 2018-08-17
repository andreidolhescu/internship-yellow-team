const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const settings = require('../config/Index');

module.exports =
    {
        login(req, res) {
            var Email = req.body.Email;
            var Password = req.body.Password;

            if (!Email || !Password) {
                return res.status(400).send(
                    {
                        message: "Email and password required."
                    }
                )
            }

            Email = Email.toLowerCase();

            UserModel.findOne({
                where: {
                    Email: Email,
                }
            }).then(userObj => {
                //Logic here
                if (userObj == null) {
                    return res.status(404).send({
                        message: "Incorect Email",
                    });
                }
                else if (bcrypt.compareSync(Password, userObj.Password)) {
                    console.log('Aici');

                    const payload = {
                        Mail: userObj.Mail
                    }

                    const token = jwt.sign(payload, settings.SecurityToken, {
                        expiresIn: 60
                    });

                    return res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                    });
                    //console.log("A modificat tokenul");

                    /*return res.status(200).send({
                        token: token,
                    })*/
                }
                else {
                    return res.status(404).send({
                        message: "Incorect password",
                    });
                }
            }).catch(err => {
                console.log("\n\nEroare functia 1\n\n", err);
                return res.status(400).send(err);
            });
        },
        GetToken(req, res, next) {
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            if (token) {
                jwt.verify(token, settings.SecurityToken, function (err, decoded) {
                    if (err) {
                        console.log("\n\nFunctia 2\n\n", err);
                        console.log("Token - ", token);
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                return res.status(404).send({
                    message: "No token!",
                });
            }
        },
        
        ItsValidToken(req, res) {
            return res.status(200).send({
                message: "Functia ItsValidToken, Functia 3",
            });
        }
    }
