const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
var validate = require('../validate/Validation');
var err;

module.exports = {
    // insert user into user table
    register: (req, res) => {
        return UserModel.findAll({
            where: {
                Email: req.body.Email
            }
        })
            .then((user => {
                if (user.length) {
                    return res.status(400).send({
                        message: "Email already exists!"
                    });
                }


                err = ""

                if (!validate.IsName(req.body.FirstName))
                    err += "Invalid First Name!"
                if (!validate.IsName(req.body.LastName))
                    err += "Invalid Last Name!"
                if (!validate.IsPassword(req.body.Password))
                    err += "Invalid Password!"
                if (!validate.IsMail(req.body.Email))
                    err += "Invalid Email!"


                if (String(err) == String("")) {
                    var hash = bcrypt.hashSync(req.body.Password, 10);
                    return UserModel
                        .create({
                            FirstName: req.body.FirstName,
                            LastName: req.body.LastName,
                            Password: hash,
                            Email: req.body.Email,
                            Admin: req.body.Admin,
                            Points: req.body.Points,
                            PathforImage: req.body.PathforImage
                        })
                        .then(todo => res.status(201).send(todo))
                        .catch(error => res.status(400).send(error));
                }
                else
                    return res.status(404).send({
                        message: err,
                    });
            }))
            .catch(error => res.status(400).send(error))
    },


    // get all entries from User table
    list(req, res) {
        return UserModel
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // get user by id
    getById(req, res) {
        return UserModel
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },

    // update an entry
    update(req, res) {
        err = ""

        if (!validate.IsName(req.body.FirstName))
            err += "Invalid First Name!"
        if (!validate.IsName(req.body.LastName))
            err += "Invalid Last Name!"
        if (!validate.IsPassword(req.body.Password))
            err += "Invalid Password!"
        if (!validate.IsMail(req.body.Email))
            err += "Invalid Email!"


        UserModel.findAll({
            where: {
                Email: req.body.Email
            }
        })
            .then((user => {
                if (user.length) {
                    return res.status(400).send({
                        message: "Email already exists!"
                    });
                }

                return UserModel
                    .findById(req.params.userId)
                    .then(user => {
                        if (!user) {
                            return res.status(404).send({
                                message: 'User Not Found',
                            });
                        }

                        if (String(err) == String("")) {
                            var hash = bcrypt.hashSync(req.body.Password, 10);
                            return user
                                .update({
                                    FirstName: req.body.FirstName,
                                    LastName: req.body.LastName,
                                    Password: hash,
                                    Email: req.body.Email,
                                    Admin: req.body.Admin,
                                    Points: req.body.Points,
                                    PathforImage: req.body.PathforImage
                                })
                                .then(() => res.status(200).send(user))
                                .catch((error) => res.status(400).send(error));
                        }
                        else
                            return res.status(404).send({
                                message: err,
                            });

                    })
            }))
            .catch((error) => res.status(400).send(error));
    },

    getUserByToken(req, res) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token)
        {
            
        }
    },

    // delete an entry IF ADMIN -> TODO
    destroy(req, res) {
        return UserModel
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }

                return user
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

};