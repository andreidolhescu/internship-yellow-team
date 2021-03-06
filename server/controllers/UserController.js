const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
var validate = require('../validate/Validation');
const multer = require('multer');
var fs = require('fs');
var err;

//Set storage image
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        //console.log(file);
        var name = file.fieldname + '-' + Date.now() + "." + file.mimetype.split('/')[1];
        //console.log(name);
        cb(null, name)
    }
});

const upload = multer({
    storage: storage
}).single('Image');

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
        console.log("ID :", req.decoded.ID);
        return UserModel
            .findOne({
                where: {
                    id: req.decoded.ID
                },
                attributes: ['FirstName', 'LastName', 'Mail', 'Admin', "Path", 'Points', 'createdAt', 'updatedAt']
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

    updateById(req, res) {
        err = ""

        if (!validate.IsName(req.body.FirstName))
            err += "Invalid First Name! ";
        if (!validate.IsName(req.body.LastName))
            err += "Invalid Last Name! ";

        return UserModel
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'User Not Found',
                    });
                }
                if (String(err) == String("")) {
                    return user
                        .update({
                            FirstName: req.body.FirstName,
                            LastName: req.body.LastName
                        })
                        .then(() => res.status(200).send({
                            success: true,
                            message: "User updated."
                        }))
                        .catch((error) => res.status(400).send(error));
                }
                else
                    return res.status(400).send({
                        success: false,
                        message: err,
                    });
            })
            .catch((error) => res.status(400).send(error));
    },

    // update an entry
    update(req, res) {
        err = ""

        if (!validate.IsName(req.body.FirstName))
            err += "Invalid First Name! ";
        if (!validate.IsName(req.body.LastName))
            err += "Invalid Last Name! ";
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
                                if (req.body.Password != null && req.body.Password != "") {
                                    if (validate.IsPassword(req.body.Password)) {
                                        var hash = bcrypt.hashSync(req.body.Password, 10);
                                        if (obj == null) {
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
                                        }
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
                                            return res.status(400).send({
                                                success: false,
                                                message: 'Mail already exist.',
                                            });
                                        }
                                    }
                                    else {
                                        return res.status(404).send({
                                            success: false,
                                            message: 'Password to weak.',
                                        });
                                    }
                                }
                                else {
                                    if (obj == null) {
                                        return user
                                            .update({
                                                FirstName: req.body.FirstName,
                                                LastName: req.body.LastName,
                                                Mail: mail
                                            })
                                            .then(() => res.status(200).send({
                                                success: true,
                                                message: "User updated."
                                            }))
                                            .catch((error) => res.status(400).send(error));
                                    }
                                    else if (obj.id == req.decoded.ID) {
                                        return user
                                            .update({
                                                FirstName: req.body.FirstName,
                                                LastName: req.body.LastName
                                            })
                                            .then(() => res.status(200).send({
                                                success: true,
                                                message: "User updated."
                                            }))
                                            .catch((error) => res.status(400).send(error));
                                    }
                                    else {
                                        return res.status(400).send({
                                            success: false,
                                            message: 'Mail already exist.',
                                        });
                                    }
                                }
                            }
                            else {
                                return res.status(400).send({
                                    success: false,
                                    message: err,
                                });
                            }
                        }
                        )
                }
                )
            }))
    },



    uploadImage(req, res) {
        upload(req, res, (err) => {
            if (err) {
                return res.status(404).send({
                    success: false,
                    message: err
                })
            }
            else {
                if (req.file != null) {
                    UserModel.findById(req.decoded.ID)
                        .then((user => {
                            if (user.Path != "public/images/defaultuser.jpg") {
                                try {
                                    fs.unlinkSync(user.Path);
                                }
                                catch (Exception) {
                                    console.log("Fisierul nu exista!");
                                }
                            }
                            return user.update({
                                Path: "public/images/" + req.file.filename
                            })
                                .then(user => res.status(201).send({
                                    success: true,
                                    message: "Uploaded successful image for user."
                                }))
                                .catch(error => {
                                    return res.status(400).send(error);
                                });
                        }))
                }
                else {
                    return res.status(400).send({
                        success: false,
                        message: "No file uploaded"
                    })
                }
            }
        });
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