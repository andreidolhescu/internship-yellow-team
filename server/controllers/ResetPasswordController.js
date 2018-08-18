const jwt = require('jsonwebtoken');
const UserTokens = require('../models').UserTokens;

const GetMailByToken = (token, callback) => {
    var ob =
    {
        token: token
    };
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
            else
            {
            callback(userTokens.mail);
            }
        });
};

module.exports =
    {
        NewPassword(req, res) {
            var mail = req.body.mail;
            return res.status(200).send({
                message: "Se poate de schimbat parola la mailul respectiv : ", mail,
            });
        },

        VerifyToken(req, res, next) {

            var token = req.params.token;

            //De extras din baza de date mail-ul pentru comparare!
            //var UserTokenController = require('../controllers').UserTokenController;
            var mail;

            GetMailByToken(token, function (a) {
                mail = a
                if (mail != "nullable")
                {
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

        SendToken(req, res) {
            var mail = req.body.mail;

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
    }