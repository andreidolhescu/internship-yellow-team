const UserTokens = require('../models').UserTokens;

module.exports = {
    createWithParameters(mail, token) {
        return UserTokens
            .findOne({ mail: mail })
            .then(function (obj) {
                if (obj) { // update
                    return obj.update({
                        token: token
                    });
                }
                else { // insert
                    return UserTokens.create({
                        mail: mail,
                        token: token
                    });
                }
            }
            )
    },

    // get all entries from Test table
    list(req, res) {
        return UserTokens
            .all()
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getMailByToken(token, req, res) {
        return UserTokens
            .findByToken(token)
            .then(userTokens => {
                if (!userTokens) {
                    return res.status(404).send({
                        success: false,
                        message: 'Test Not Found',
                    });
                }
                return userTokens.mail;
            })
            .catch(error => res.status(400).send(error));
    },

    // update an entry
    update(req, res) {
        return UserTokens
            .findById(req.params.testId)
            .then(userTokens => {
                if (!userTokens) {
                    return res.status(404).send({
                        success: false,
                        message: 'Test Not Found',
                    });
                }

                return userTokens
                    .update({
                        name: req.body.name || test.name,
                    })
                    .then(() => res.status(200).send(userTokens))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry
    destroy(req, res) {
        return UserTokens
            .findById(req.params.testId)
            .then(userTokens => {
                if (!userTokens) {
                    return res.status(404).send({
                        success: false,
                        message: 'Test Not Found',
                    });
                }

                return test
                    .destroy()
                    .then(() => res.status(200).send({
                        success: true,
                        message: "User token deleted."
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};