const UserModel = require('../models').User;
var validate = require('../validate/Validation');
var err;
validate.IsMail()

module.exports = {
    // insert user into user table
    create: (req, res) => {
        return UserModel.findAll({
            where: {
                Email: req.body.Email
            }
        })
        .then((user => {
            if(user.length) {
                return res.status(400).send({
                    message: "User already exists!"
                });
            }

        
        err = ""

        if(!validate.IsName(req.body.FirstName))
            err += "Invalid First Name!"
        if(!validate.IsName(req.body.LastName))
            err += "Invalid Last Name!"
        if(!validate.IsPassword(req.body.Password))
            err += "Invalid Password!"
        if(!validate.IsMail(req.body.Email))
            err += "Invalid Email!"


        if(String(err) == String(""))
        {
            return UserModel
            .create({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Password: req.body.Password,
                Email: req.body.Email,
                UserRole: req.body.UserRole,
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
    list (req, res) {
        return UserModel
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById (req, res) {
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
    update (req, res) {
        err = ""

        if(!validate.IsName(req.body.FirstName))
            err += "Invalid First Name!"
        if(!validate.IsName(req.body.LastName))
            err += "Invalid Last Name!"
        if(!validate.IsPassword(req.body.Password))
            err += "Invalid Password!"
        if(!validate.IsMail(req.body.Email))
            err += "Invalid Email!"


        return UserModel
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }

                if(String(err) == String(""))
        {
                return user
                    .update({
                        FirstName: req.body.FirstName,
                        LastName: req.body.LastName,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        UserRole: req.body.UserRole,
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
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry
    destroy (req, res) {
        return TestModel
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