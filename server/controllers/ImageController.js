const ImageModel = require('../models').Image;

var err;


module.exports = {
    // insert image into image table
    create: (req, res) => {
        return ImageModel.findAll({
            where: {
                path: req.body.path
            }
        })
        .then((image => {
            if(image.length) {
                return res.status(400).send({
                    message: "Path already exists!"
                });
            }

        
        err = ""

      

        if(String(err) == String(""))
        {
            
            return ImageModel
            .create({
                path: req.body.path
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
    

    // get all entries from image table
    list (req, res) {
        return ImageModel
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById (req, res) {
        return ImageModel
            .findById(req.params.imageId)
            .then(image => {
                if (!image) {
                  return res.status(404).send({
                    message: 'image Not Found',
                  });
                }
                return res.status(200).send(image);
              })
              .catch(error => res.status(400).send(error));
    },

    // update an entry
    update (req, res) {
        err = ""

        ImageModel.findAll({
            where: {
                path: req.body.path
            }
        })
        .then((image => {
            if(image.length) {
                return res.status(400).send({
                    message: "Path already exists!"
                });
            }

        return ImageModel
            .findById(req.params.imageId)
            .then(image => {
                if (!image) {
                    return res.status(404).send({
                        message: 'image Not Found',
                    });
                }

                if(String(err) == String(""))
        {
                var hash = bcrypt.hashSync(req.body.Password, 10);
                return image
                    .update({
                        path: req.body.path
                    })
                    .then(() => res.status(200).send(image))
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

    // delete an entry
    destroy (req, res) {
        return TestModel
            .findById(req.params.imageId)
            .then(image => {
                if (!image) {
                    return res.status(404).send({
                        message: 'image Not Found',
                    });
                }

                return image
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

};