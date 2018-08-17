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
                        Mail : userObj.Mail
                    }

                    const token = jwt.sign(payload,settings.SecurityToken,{
                        expiresIn : 1
                    });
                    console.log(token);
                    return res.status(200).send({
                        token: token,
                    })
                }
                else {
                    return res.status(404).send({
                        message: "Incorect password",
                    });
                }
            }).catch(err => {
                console.log("Eroare ",err);
                return res.status(400).send(err);
            });
        }
    }
