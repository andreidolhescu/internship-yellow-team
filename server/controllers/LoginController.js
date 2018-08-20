    const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const settings = require('../config/Index');

const getUser = (mail, res) =>
    UserModel.findOne({
        where: {
            Mail: mail
        }
    }).then(userTokens => {
        if (userTokens != null) {
            return res(userTokens);
        }
        else {
            return res("null");
        };
    });

module.exports =
    {
        login(req, res) {
            var Mail = req.body.Mail;
            var Password = req.body.Password;

            if (!Mail || !Password) {
                return res.status(400).send(
                    {
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
                //Logic here
                if (userObj == null) {
                    return res.status(404).send({
                        message: "Incorect Mail",
                    });
                }
                else if (bcrypt.compareSync(Password, userObj.Password)) {

                    const payload = {
                        Mail: userObj.Mail
                    }

                    const token = jwt.sign(payload, settings.SecurityToken, {
                        expiresIn: 3600
                    });
                    req.headers['token'] = token;
                    req.headers['id'] = 1;

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

        //Daca este logat merge pentru toti.
        GetToken(req, res, next) {
            var token = req.body.token || req.query.token || req.headers['token'];

            if (token) {
                jwt.verify(token, settings.SecurityToken, function (err, decoded) {
                    if (err) {
                        console.log("\n\nFunctia 2\n\n", err);
                        console.log("Token - ", token);
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    } else {
                        // if everything is good, save to request for use in other routes
                        //console.log(result);\
                        // Aici deducem mail-ul persoanei care a intrat
                        req.decoded = decoded;
                        //console.log(decoded.Mail);
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

        //Daca esti logat, merge doar pentru admini
        GetUserRole(req, res, next) {
            var token = req.body.token || req.query.token || req.headers['token'];

            jwt.verify(token, settings.SecurityToken, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // Aici deducem mail-ul persoanei care a intrat
                    getUser(decoded.Mail, function (result) {
                        if (result != "null") {
                            if (result.Admin) {
                                req.decoded = decoded;
                                next();
                            }
                            else {
                                return res.status(404).send({
                                    message: "You don't have access!"
                                })
                            }
                        }
                        else {
                            return res.status(404).send({
                                message: "Nu a fost gasit nimic!"
                            })
                        }
                    })


                }
            });
        },

        ItsValidToken(req, res) {
            return res.status(200).send({
                message: "Functia ItsValidToken, Functia 3",
            });
        }
    }
