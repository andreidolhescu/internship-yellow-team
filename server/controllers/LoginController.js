const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const settings = require('../config/Index');


module.exports =
    {
        //Logare
        login(req, res) {
            var Mail = req.body.Mail;
            var Password = req.body.Password;

            if (!Mail || !Password) {
                return res.status(400).send(
                    {
                        success: false,
                        message: "Mail and password required."
                    }
                )
            }

            Mail = Mail.toLowerCase();

            UserModel.findOne({
                where: {
                    Mail: Mail,
                }
            }).then(userObj => {
                if (userObj == null) {
                    return res.status(404).send({
                        success: false,
                        message: "Incorect Mail",
                    });
                }
                else if (bcrypt.compareSync(Password, userObj.Password)) {

                    const payload = {
                        ID: userObj.id
                    }

                    const token = jwt.sign(payload, settings.SecurityToken, {
                        expiresIn: 43200
                    });
                    req.headers['token'] = token;

                    return res.status(200).send({
                        success: true,
                        token: token,
                    });
                }
                else {
                    return res.status(404).send({
                        success: false,
                        message: "Incorrect password",
                    });
                }
            }).catch(err => {
                return res.status(400).send(err);
            });
        },

        //Daca este logat merge pentru toti.
        IsAdminOrUser(req, res, next) {

            var token = req.body.token || req.query.token || req.headers['token'];

            if (token) {
                jwt.verify(token, settings.SecurityToken, function (err, decoded) {
                    if (err) {
                        return res.status(404).send({
                            success: false,
                            message: 'Failed to authenticate token.'
                        });
                    } else {
                        UserModel.findById(decoded.ID)
                            .then((user => {
                                if (user != null) {
                                    req.decoded = decoded;
                                    next();
                                }
                                else {
                                    return res.status(404).send({
                                        success: false,
                                        message: "No user found in database for this token",
                                    });
                                }
                            }));
                    }
                });
            }
            else {
                return res.status(404).send({
                    success: false,
                    message: "No token found!",
                });
            }
        },

        //Daca esti logat, merge doar pentru admini
        IsAdmin(req, res, next) {
            var token = req.body.token || req.query.token || req.headers['token'];
            jwt.verify(token, settings.SecurityToken, function (err, decoded) {
                if (err) {
                    return res.status(404).send({
                        success: false,
                        message: 'Failed to authenticate token.',
                        message: err
                    });
                }
                else {
                    UserModel.findById(decoded.ID).then((user) => {
                        if (user.Admin) {
                            req.decoded = decoded;
                            next();
                        }
                        else {
                            return res.status(401).send({
                                success: false,
                                message: "You don't have access!"
                            })
                        }
                    }).catch((error) => res.status(404).send(error));
                }
            });
        },

        //Cica logout :))
        InitialPage(req, res) {
            req.headers['token'] = "";
        }
    }
