const ImageModel = require('../models').Image;
const UserModel = require('../models').User;
const CourseModel = require('../models').Course;
const Sequelize = require('sequelize');
const multer = require('multer');

//Set storage image
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        console.log(file);
        var name = file.fieldname + '-' + Date.now() + "." + file.mimetype.split('/')[1];
        //console.log(name);
        cb(null, name)
    }
});

const upload = multer({
    storage: storage
}).single('Image');

module.exports = {

    /*uploadFile: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                return res.status(404).send({
                    message: err
                })
            }
            else {
                if (req.file == null) {
                    return res.status(404).send({
                        message: "No file"
                    })
                }
                else {
                    console.log(req.file.filename);
                    return res.status(200).send({
                        message: "Upload file successful : " + req.file.filename
                    })
                }
            }
        })
    },

*/
    // insert image into Image table -> TREBUIE FACUT SEPARARE INTRE CURS SI USER
    create: (req, res) => {
        if (req.decoded.ID != null) {

            upload(req, res, (err) => {
                if (err) {
                    return res.status(404).send({
                        message: err
                    })
                }
                else {

                    if (req.file != null) {
                        return ImageModel.create({
                            path: "pubic/images/" + req.file.filename,
                            courseId: req.params.courseId,
                            userId: req.decoded.ID
                        })
                            .then(image => res.status(201).send(image))
                            .catch(error => {
                                //console.log("Eroare: ", error)
                                return res.status(400).send(error);
                            });

                        return res.status(200).send({
                            message: "Upload file successful : " + req.file.filename
                        })
                    }
                    else {
                        return res.status(400).send({
                            message: "No file upload"
                        })
                    }
                }
            })
        }
        else{
            //Aici trebuie de verificat daca insereaza imagine pentru curs, nu sunt sigur ca functioneaza
            upload(req, res, (err) => {
                if (err) {
                    return res.status(404).send({
                        message: err
                    })
                }
                else {

                    if (req.file != null) {
                        return ImageModel.create({
                            path: "pubic/images/" + req.file.filename,
                            courseId: req.params.courseId,
                            userId: null
                        })
                            .then(image => res.status(201).send(image))
                            .catch(error => {
                                //console.log("Eroare: ", error)
                                return res.status(400).send(error);
                            });

                        return res.status(200).send({
                            message: "Upload file successful : " + req.file.filename
                        })
                    }
                    else {
                        return res.status(400).send({
                            message: "No file upload"
                        })
                    }
                }
            })
        }
    },

    // get all entries from Image table
    list(req, res) {
        return ImageModel
            .all()
            .then(images => res.status(200).send(images))
            .catch(error => res.status(400).send(error));
    },

    userlist(req, res) {
        return ImageModel
            .findAll({
                where: {
                    userId: {
                        [Sequelize.Op.ne]: null
                    }
                },
                include: [
                    {
                        model: UserModel,// as:'u',
                        // attributes: ['id'],
                        // where:{userId: !null},
                        required: false
                    }]
            })

            .then(image => res.status(201).send(image))
            .catch(error => {
                console.log("Eroare: ", error)
                return res.status(400).send(error);
            });
    },

    curslist(req, res) {
        return ImageModel
            .findAll({
                where: {
                    courseId: {
                        [Sequelize.Op.ne]: null
                    }
                },
                include: [
                    {
                        model: CourseModel,// as:'u',
                        // attributes: ['id'],
                        // where:{userId: !null},
                        required: false
                    }]
            })

            .then(image => res.status(201).send(image))
            .catch(error => {
                console.log("Eroare: ", error)
                return res.status(400).send(error);
            });
    },

    // get an entry by id
    getById(req, res) {
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
    update(req, res) {
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
    destroy(req, res) {
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