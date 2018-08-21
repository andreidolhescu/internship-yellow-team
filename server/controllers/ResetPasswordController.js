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
        //Daca trece token-ul, facem redirect
        Redirect(req, res) {
            var mail = req.body.mail;
            res.writeHead(302, { 'Location': req.url + "/change" });
            return res.end();
        },

        //Facem update la parola
        NewPassword(req, res) {
            //Facem update la parola dupa mailul respectiv
            GetUserByToken(req.params.token, function (response) {
                return UserModel
                    .findOne({ Mail: response.Mail })
                    .then(function (obj) {
                        if (obj) {
                            console.log("Userul a fost gasit, incercam sa facem update");
                            if (validator.IsPassword(req.body.Password)) {

                                //Criptarea parolei
                                var hash = bcrypt.hashSync(req.body.Password, 10);

                                obj.update({
                                    Password: hash
                                });
                                UserTokens.destroy({
                                    where: {
                                        token: req.params.token
                                    }
                                });
                                console.log("Token sters");
                                return res.status(200).send({
                                    message: "Token Sters "
                                });
                            }
                            else
                            {
                                return res.status(404).send({
                                    message: "Parola nu a trecut validarea"
                                });
                            }
                        }
                        else {
                            return res.status(400).send({
                                message: "Nu a fost gasit userul "
                            });
                        }
                    }
                    )
            })


        },

        //Primim mesaj ca putem modifica parola, adica tokenul si mailul sun valide in baza de date
        ChangePassword(req, res) {
            return res.status(200).send({
                message: "Se poate de modificat parola, Metoda ChangePassword"
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
                            return res.json({ success: false, message: 'Failed to authenticate token.' });
                        } else {
                            req.decoded = decoded;
                            next();
                        }
                    });
                }
                else {
                    return res.json({ success: false, message: 'Nu exista asa token!' });
                }
            });
            
        },

        //Trimitem token-ul daca este gasit in baza de date.
        SendToken(req, res) {
            var mail = req.body.mail;

            IfExistMail(String(mail).toLowerCase(), function (response) {
                if (response == "true") {
                    const payload = {
                        mail: mail
                    }

                    const token = jwt.sign(payload, mail, {
                        expiresIn: 3600
                    });

                    const MailController = require('../controllers').MailController;
                    MailController.SendMailWithParameters(mail, "Forgot Password", token);
                    const UserTokenController = require('../controllers').UserTokenController;
                    //Trimitem mail
                    UserTokenController.createWithParameters(mail, token);

                    return res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                    });
                }
                else {
                    return res.json({ success: false, message: 'Nu exista asa mail inregistrat in baza de date!' });
                }
            })
        }
    }