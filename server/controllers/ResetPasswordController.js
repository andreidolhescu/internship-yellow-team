const jwt = require('jsonwebtoken');
const UserTokens = require('../models').UserTokens;
const UserModel = require('../models').User;
const validator = require('../validate/Validation');
const bcrypt = require('bcrypt');

const GetUserByToken = (token, callback) => {
    return UserTokens
        .findOne({
            where: {
                token: token,
            }
        })
        .then(userTokens => {
            if (userTokens == null) {
                callback("nullable");
            }
            else {
                callback(userTokens);
            }
        });
}
const IfExistMail = (mail, callback) => {
    return UserModel
        .findOne({
            where: {
                Mail: mail,
            }
        })
        .then(userTokens => {
            if (userTokens == null) {
                callback("false");
            }
            else {
                callback("true");
            }
        });
}

module.exports =
    {
        //Facem update la parola
        NewPassword(req, res) {
            //Facem update la parola dupa mailul respectiv
            GetUserByToken(req.params.token, function (response) {
                return UserModel
                    .findOne({
                        Mail: response.Mail
                    })
                    .then(function (obj) {
                        if (obj) {
                            if (validator.IsPassword(req.body.Password)) {

                                var hash = bcrypt.hashSync(req.body.Password, 10);
                                obj.update({
                                    Password: hash
                                });
                                UserTokens.destroy({
                                    where: {
                                        token: req.params.token
                                    }
                                });
                                return res.status(200).send({
                                    success: true,
                                    message: "Token deleted from database"
                                });
                            }
                            else {
                                return res.status(404).send({
                                    success: false,
                                    message: "Password to weak."
                                });
                            }
                        }
                        else {
                            return res.status(400).send({
                                success: false,
                                message: "User not found."
                            });
                        }
                    }
                    )
            })
        },

        //Primim mesaj ca putem modifica parola, adica tokenul si mailul sun valide in baza de date
        ChangePassword(req, res) {
            return res.status(200).send({
                success: true,
                message: "Token-ul este valid! Aici tre sa fie pagina de login"
            });
        },

        //Verificam tokenul daca mai este activ, daca da, trecem la next si ii permitem sa schimbe parola
        VerifyToken(req, res, next) {

            var token = req.params.token;
            var mail;
            GetUserByToken(token, function (a) {
                mail = a.mail;
                if (mail != "nullable" && mail != "nullable") {
                    jwt.verify(token, mail, function (err, decoded) {
                        if (err) {
                            return res.status(400).send({
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
                        success: false,
                        message: 'Token not found.'
                    });
                }
            });
        },

        //Trimitem token-ul daca este gasit in baza de date.
        SendToken(req, res) {
            var mail = req.body.Mail;

            IfExistMail(String(mail).toLowerCase(), function (response) {
                if (response == "true") {
                    const payload = {
                        mail: mail
                    }

                    const token = jwt.sign(payload, mail, {
                        expiresIn: 43200
                    });

                    const MailController = require('../controllers').MailController;
                    MailController.SendMailWithParameters(mail, "Forgot Password", token);
                    const UserTokenController = require('../controllers').UserTokenController;
                    //Trimitem mail
                    UserTokenController.createWithParameters(mail, token);

                    return res.status(200).send({
                        success: true,
                        message: 'The token was sent to your mail!',
                        //token: token,
                    });
                }
                else {
                    return res.status(404).send({
                        success: false,
                        message: 'Not found mail in database!'
                    });
                }
            })
        }
    }