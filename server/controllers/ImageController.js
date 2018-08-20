const ImageModel = require('../models').Image;

module.exports = {
    // insert image into Image table -> TREBUIE FACUT SEPARARE INTRE CURS SI USER
    create: (req, res) => {
        return ImageModel.create({
            path: req.body.path,
            courseId: req.params.courseId,
            userId: req.params.userId
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => {
        	console.log("Eroare: ", error)
        	return res.status(400).send(error);
        });
    },

    // get all entries from Image table
    list (req, res) {
        return ImageModel
            .all()
            .then(images => res.status(200).send(images))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById (req, res) {
        return ImageModel
            .findById(req.params.imageId)
            .then(image => {
                if (!image) {
                  return res.status(404).send({
                    message: 'Image Not Found',
                  });
                }
                return res.status(200).send(image);
              })
              .catch(error => res.status(400).send(error));
    },

    // update an entry
    update (req, res) {
        return ImageModel
            .findById(req.params.imageId)
            .then(image => {
                if (!image) {
                    return res.status(404).send({
                        message: 'Image Not Found',
                    });
                }
                
            return image
                .update({
                    path: req.body.path,
            		courseId: req.params.courseId,
            		userId: req.params.userId
                })
                .then(() => res.status(200).send(image))
                .catch((error) => res.status(400).send(error));
            
                    
            })
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry
    destroy (req, res) {
        return ImageModel
            .findById(req.params.imageId)
            .then(image => {
                if (!image) {
                    return res.status(404).send({
                        message: 'Image Not Found',
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