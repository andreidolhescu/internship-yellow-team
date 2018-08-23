
module.exports = {

    SendMail(req, res) {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'klgrakk1@gmail.com',
                pass: 'assist123'
            }
        });

        const mailOptions = {
            from: 'klgrakk1@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.html
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err == null) {
                return res.status(200).send({
                    message: "Mail Send",
                });
            }
            else {
                console.log(err);
                return res.status(404).send({
                    message: "Fail Mail Send",
                });
            }
        });
    },

    SendMailWithParameters(to, subject, html, res) {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'klgrakk1@gmail.com',
                pass: 'assist123'
            }
        });

        const mailOptions = {
            from: 'klgrakk1@gmail.com',
            to: to,
            subject: subject,
            html: "Your link is " + "http://192.168.151.36:8000/api/reset/" + html //De modificat in server. ceva ?
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err == null) {
                return res.status(200).send({
                    message: "Mail Send",
                });
            }
            else {
                console.log(err);
                return res.status(404).send({
                    message: "Fail Mail Send",
                });
            }
        });
    }
}