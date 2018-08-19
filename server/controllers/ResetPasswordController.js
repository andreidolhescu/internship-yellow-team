const jwt = require('jsonwebtoken');
const UserTokens = require('../models').UserTokens;
const UserModel = require('../models').User;
const validator = require('../validate/Validation');

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
};

const IfExistMail = (mail, callback) => {
    return UserModel
        .findOne({

            where: {
                Email: mail,
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
            /*return res.status(200).send({
                message: "Se poate de schimbat parola la mailul respectiv : ", mail,
            });*/
            res.writeHead(302, { 'Location': req.url + "/change" });
            return res.end();
        },

        //Facem update la parola
        NewPassword(req, res) {
            /*GetMailByToken(req.params.token, function (response) {
                return res.status(200).send({
                    message: "Se poate de schimbat parola la mailul respectiv : ", response,
                });

            })*/

            //Facem update la parola dupa mailul respectiv

            GetUserByToken(req.params.token, function (response) {
                console.log(response);
                return UserModel
                    .findOne({ Email: response.mail })
                    .then(function (obj) {
                        if (obj) { // update
                            console.log("Userul a fost gasit, incercam sa facem update");
                            if (validator.IsPassword(req.body.Password)) {
                                obj.update({
                                    Password: req.body.Password
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
                        else { // insert
                            console.log("Userul nu a fost gasit");
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
            //5var mail = req.body.mail;
            return res.status(200).send({
                message: "Se poate de modificat parola, Metoda ChangePassword"
            });
        },

        //Verificam tokenul daca mai este activ, daca da, trecem la next si ii permitem sa schimbe parola
        VerifyToken(req, res, next) {

            var token = req.params.token;

            //console.log("VerifyTOken");
            //De extras din baza de date mail-ul pentru comparare!
            //var UserTokenController = require('../controllers').UserTokenController;
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
            /*console.log("\n\n", mail, "\n\n");


            console.log('\n\nRezultatul\n\n', mail);
            jwt.verify(token, mail, function (err, decoded) {
                if (err) {
                    //console.log("\n\nFunctia 2\n\n", err);
                    console.log("Token - ", token);
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });*/
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
                    // NU merge ?
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