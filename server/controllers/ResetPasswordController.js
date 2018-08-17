const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const settings = require('../config/Index');
const MailController = require('../controllers').MailController;

module.exports =
    {
        NewPassword(req, res) {
            var mail = req.body.mail;
            return res.status(200).send({
                message: "Se poate de schimbat parola la mailul respectiv : ", mail,
            });
        },

        VerifyToken(req, res, next) {
            var mail = req.body.mail;
            var token = req.params.token;

            jwt.verify(token, mail, function (err, decoded) {
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
        },

        SendToken(req, res) {
            var mail = req.body.mail;

            const payload = {
                mail: mail
            }

            const token = jwt.sign(payload, mail, {
                expiresIn: 3600
            });

            //MailController.SendMail()

            return res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token,
            });
        }
    }