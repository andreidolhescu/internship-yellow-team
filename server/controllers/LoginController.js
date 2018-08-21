const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const settings = require('../config/Index');


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
                if (userObj == null) {
                    return res.status(404).send({
                        message: "Incorect Mail",
                    });
                }
                else if (bcrypt.compareSync(Password, userObj.Password)) {

                    const payload = {
                        ID: userObj.id
                    }

                    const token = jwt.sign(payload, settings.SecurityToken, {
                        expiresIn: 3600
                    });
                    req.headers['token'] = token;

                    return res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                    });
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
        IsAdminOrUser(req, res, next) {

            var token = req.body.token || req.query.token || req.headers['token'];

            if (token) {
                jwt.verify(token, settings.SecurityToken, function (err, decoded) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Failed to authenticate token.'
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                return res.status(404).send({
                    message: "No token found!",
                });
            }
        },

        //Daca esti logat, merge doar pentru admini
        IsAdmin(req, res, next) {
            var token = req.body.token || req.query.token || req.headers['token'];
            jwt.verify(token, settings.SecurityToken, function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                }
                else {
                    UserModel.findById(decoded.ID).then((user) => {
                        if (user.Admin) {
                            req.decoded = decoded;
                            next();
                        }
                        else {
                            return res.status(404).send({
                                message: "You don't have access!"
                            })
                        }
                    })

                }
            });
        },

        /*GetUserID(req, res) {
            var token = req.body.token || req.query.token || req.headers['token'];

            jwt.verify(token, settings.SecurityToken, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // Aici deducem mail-ul persoanei care a intrat
                    /*getUser(decoded.Mail, function (result) {
                        if (result != "null") {
                            return res.status(200).send({
                                id: result.id
                            })
                        }
                        else {
                            return res.status(404).send({
                                message: "Nu a fost gasit nimic!"
                            })
                        }
                    })
                    return res.status(200).send({
                        id: decoded.ID
                    })


                }
            });
        },*/

        ItsValidToken(req, res) {
            return res.status(200).send({
                message: "Functia ItsValidToken, Functia 3",
            });
        },

        InitialPage(req, res) {
            req.headers['token'] = "";
            console.log(require('../config/config.json').development.host);
            res.writeHead(301, { 'Location': 'index.html' });
            return res.end();
        }
    }
