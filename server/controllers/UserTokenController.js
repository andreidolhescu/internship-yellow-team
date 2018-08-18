const UserTokens = require('../models').UserTokens;

module.exports = {
    // insert name into Test table
    create(req, res) {
        return UserTokens
            .create({
                mail: req.body.mail,
                token: req.body.token
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    createWithParameters(mail, token) {
        return UserTokens
            .create({
                mail: mail,
                token: token
            })
            .then({
                message: "Succes"
            })
            .catch({
                message : "Eroare"
            });
    },

    // get all entries from Test table
    list(req, res) {
        return UserTokens
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getMailByToken(token, req, res) {
        return UserTokens
            .findByToken(token)
            .then(userTokens => {
                if (!userTokens) {
                    return res.status(404).send({
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
                        message: 'Test Not Found',
                    });
                }

                return test
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

};