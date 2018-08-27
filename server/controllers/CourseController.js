const CourseModel = require('../models').Course;
const Sequelize = require('sequelize');
var validate = require('../validate/Validation');
var err;

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