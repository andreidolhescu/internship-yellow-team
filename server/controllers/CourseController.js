const CourseModel = require('../models').Course;
const Sequelize = require('sequelize');
const multer = require('multer');
var fs = require('fs');

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
    // insert course into Course table
    create: (req, res) => {
        return CourseModel.findAll({
            where: {
                Title: req.body.Title,
                categoryId: req.query.categoryId
            }
        })

            .then((course => {
                if (course.length) {
                    return res.status(400).send({
                        success: false,
                        message: "Course already exists!"
                    });
                }
                if (req.body.Title != null && req.body.Summary != null && req.body.Description != null)
                    return CourseModel.create({
                        Title: req.body.Title,
                        Summary: req.body.Summary,
                        Description: req.body.Description,
                        Tags: req.body.Tags,
                        categoryId: req.query.categoryId
                    })
                        .then(todo => res.status(201).send({
                            success: true,
                            message: "Course created"
                        }))
                        .catch(error => {
                            return res.status(400).send(error);
                        });
                else {
                    return res.status(400).send({
                        success: false,
                        message: "Title,Summary or Description is null"
                    });
                }
            }))
            .catch(error => {
                return res.status(400).send(error);
            });
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
                    CourseModel.findById(req.query.courseId)
                        .then((course => {
                            console.log(course);
                            if (course.Path != "public/images/defaultcourse.jpg") {
                                try {
                                    fs.unlinkSync(course.Path);
                                }
                                catch (Exception) {
                                    console.log("Fisierul nu exista!");
                                }
                            }
                            return course.update({
                                Path: "public/images/" + req.file.filename
                            })
                                .then(course => res.status(201).send({
                                    success: true,
                                    message: "Uploaded successful image for course."
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


    // get all entries from Course table for a category Id
    list(req, res) {
        return CourseModel
        .findAll({
            where: {
                categoryId: req.query.categoryId
                }
            })
            .then(course => {
                if (course == "") {
                    return res.status(404).send({
                        success: false,
                        message: 'There are not courses for this category!',
                    });
                }
                if (!course) {
                    return res.status(404).send({
                        success: false,
                        message: 'Course not found!',
                    });
                }
                return res.status(200).send(course);
            })
            .catch(error => res.status(400).send(error));
    },

    //search by Title
    search(req,res) {
        return CourseModel
        .findAll({
               where: {
                 Title: {
                    [Sequelize.Op.like]: '%' + req.body.Title + '%'
                 }
               }
            })
            .then(course => {
                if (course == "") {
                    return res.status(404).send({
                        success: false,
                        message: 'There are no courses with this title!',
                    });
                }
                if (!course) {
                    return res.status(404).send({
                        success: false,
                        message: 'Course not found!',
                    });
                }
                return res.status(200).send(course);
            })
            .catch(error => {
                return res.status(400).send(error);
            });
    },

    // get an entry by id
    getById(req, res) {
        return CourseModel
            .findById(req.params.courseId)
            .then(course => {
                if (!course) {
                    return res.status(404).send({
                        success: false,
                        message: 'Course Not Found',
                    });
                }
                return res.status(200).send(course);
            })
            .catch(error => res.status(400).send(error));
    },

    // update an entry 
    update(req, res) {
        CourseModel.findAll({
            where: {
                Title: req.body.Title,
                id: {
                  [Sequelize.Op.ne]: req.query.courseId
                } 
            }
        })
            .then((course => {
                if (course.length) {
                    return res.status(400).send({
                        success: false,
                        message: "Course already exists!"
                    });
                }

                return CourseModel
                    .findById(req.query.courseId)
                    .then(course => {
                        if (!course) {
                            return res.status(404).send({
                                success: false,
                                message: 'Course Not Found',
                            });
                        }
                        return course
                            .update({
                                Title: req.body.Title || course.Title,
                                Summary: req.body.Summary || course.Summary,
                                Description: req.body.Description || course.Description,
                                Tags: req.body.Tags || course.Tags,
                                categoryId: req.query.categoryId || course.categoryId
                            })
                            .then(() => res.status(200).send(course))
                            .catch((error) => res.status(400).send(error));

                    })
            }))
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry 
    destroy(req, res) {
        return CourseModel
            .findById(req.query.courseId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'Course Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(200).send({
                        success: true,
                        message: "Course deleted."
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};