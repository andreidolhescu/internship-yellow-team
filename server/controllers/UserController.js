const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
var validate = require('../validate/Validation');
var err;

module.exports = {
    // insert user into user table
    register: (req, res) => {
        var mail = String(req.body.Mail).toLowerCase();
        return UserModel.findAll({
            where: {
                Mail: mail
            }
        })
            .then((user => {
                if (user.length) {
                    return res.status(400).send({
                        success: false,
                        message: "Mail already exists!"
                    });
                }
                err = ""

                if (!validate.IsName(req.body.FirstName))
                    err += "Invalid First Name!"
                if (!validate.IsName(req.body.LastName))
                    err += "Invalid Last Name!"
                if (!validate.IsPassword(req.body.Password))
                    err += "Invalid Password!"
                if (!validate.IsMail(req.body.Mail))
                    err += "Invalid Mail!"

                if (String(err) == String("")) {
                    var hash = bcrypt.hashSync(req.body.Password, 10);
                    return UserModel
                        .create({
                            FirstName: req.body.FirstName,
                            LastName: req.body.LastName,
                            Password: hash,
                            Mail: mail,
                            Admin: req.body.Admin,
                            Points: req.body.Points
                        })
                        .then(todo => res.status(201).send({
                            success: true,
                            message: "User created."
                        }))
                        .catch(error => res.status(400).send(error));
                }
                else
                    return res.status(400).send({
                        success: false,
                        message: err,
                    });
            }))
            .catch(error => res.status(400).send(error))
    },


    // get all entries from User table
    list(req, res) {
        return UserModel
            .all()
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },

    // get user by id
    getById(req, res) {
        return UserModel
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },

    about(req, res) {
        return UserModel
            .findOne({
                id: req.decoded.ID,
                attributes: ['FirstName', 'LastName','Mail','Admin','Points','createdAt','updatedAt']
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },

    change(req, res) {
        return UserModel
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'User Not Found',
                    });
                }
                if (String(req.decoded.ID) != req.params.userId) {
                    //console.log(user);
                    if (user.Admin == true) {
                        user.update({
                            Admin: false
                        });
                        return res.status(200).send({
                            success: true,
                            message: 'Now, is user.',
                        });
                    }
                    else {
                        user.update({
                            Admin: true
                        });
                        return res.status(200).send({
                            success: true,
                            message: 'Now, is admin.',
                        });
                    }
                }
                else {
                    return res.status(400).send({
                        success: false,
                        message: 'Access denied.',
                    });
                }
            })
            .catch(error => res.status(400).send(error));
    },

    // update an entry
    update(req, res) {
        err = ""

        if (!validate.IsName(req.body.FirstName))
            err += "Invalid First Name! ";
        if (!validate.IsName(req.body.LastName))
            err += "Invalid Last Name! ";
        if (!validate.IsPassword(req.body.Password))
            err += "Invalid Password! ";
        if (!validate.IsMail(req.body.Mail))
            err += "Invalid Mail! ";

        UserModel.findAll({
            where: {
                id: req.decoded.ID
            }
        })
            .then((user => {
                var mail = String(req.body.Mail).toLowerCase();
                UserModel.findOne({
                    where: {
                        Mail: mail
                    }
                }).then(obj => {
                    return UserModel
                        .findById(req.decoded.ID)
                        .then(user => {
                            if (!user) {
                                return res.status(404).send({
                                    success: false,
                                    message: 'User Not Found',
                                });
                            }

                            if (String(err) == String("")) {
                                var hash = bcrypt.hashSync(req.body.Password, 10);
                                if (obj == null)
                                    return user
                                        .update({
                                            FirstName: req.body.FirstName,
                                            LastName: req.body.LastName,
                                            Password: hash,
                                            Mail: mail
                                        })
                                        .then(() => res.status(200).send({
                                            success: true,
                                            message: "User updated."
                                        }))
                                        .catch((error) => res.status(400).send(error));
                                else if (obj.id == req.decoded.ID) {
                                    return user
                                        .update({
                                            FirstName: req.body.FirstName,
                                            LastName: req.body.LastName,
                                            Password: hash
                                        })
                                        .then(() => res.status(200).send({
                                            success: true,
                                            message: "User updated."
                                        }))
                                        .catch((error) => res.status(400).send(error));
                                }
                                else {
                                    return res.status(404).send({
                                        success: false,
                                        message: 'Access denied. Mail Exist.',
                                    });
                                }
                            }
                            else
                                return res.status(400).send({
                                    success: false,
                                    message: err,
                                });
                        })
                });
            }))
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry IF ADMIN -> TODO
    destroyId(req, res) {
        return UserModel
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'User Not Found',
                    });
                }

                if (user.id == req.decoded.ID) {
                    return res.status(400).send({
                        success: false,
                        message: 'If you admin, you can\'t delete yourself.',
                    });
                }

                return user
                    .destroy()
                    .then(() => res.status(200).send({
                        success: true,
                        message: "User deleted."
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        return UserModel
            .findById(req.decoded.ID)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'User Not Found',
                    });
                }
                UserModel.findById(req.decoded.ID)
                    .then((user => {
                        if (user.Admin) {
                            return res.status(404).send({
                                success: false,
                                message: 'If you admin, you can\'t delete yourself.',
                            });
                        }
                        else {
                            return user
                                .destroy()
                                .then(() => res.status(200).send({
                                    success: true,
                                    message: "User deleted."
                                }))
                                .catch((error) => res.status(400).send(error));
                        }
                    }))
            })
            .catch((error) => res.status(400).send(error));
    },
};