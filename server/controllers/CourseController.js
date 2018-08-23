const CourseModel = require('../models').Course;
var validate = require('../validate/Validation');
var err;

module.exports = {
    // insert course into Course table
    create: (req, res) => {
        return CourseModel.findAll({
            where: {
                Title: req.body.Title
            }
        })
        .then((course => {
            if(course.length) {
                return res.status(400).send({
                    message: "Course already exists!"
                });
            }
        return CourseModel.create({
            Title: req.body.Title,
            Summary: req.body.Summary,
            Description: req.body.Description,
            Tags: req.body.Tags,
            categoryId: req.params.categoryId
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => {
        	console.log("Error: ", error)
        	return res.status(400).send(error);
        });

        
        }))
        .catch(error => {
        	console.log("Error: ", error)
        	return res.status(400).send(error);
        });
    },
    

    // get all entries from Course table for a category Id
    list (req, res) {
        return CourseModel
        .findAll({
            where: {
                categoryId: req.params.categoryId
                }
        })
            .then(course => {
                if(course == "")
                {
                    return res.status(404).send({
                    message: 'There are not courses for this category!',

                    });
                }
                if (!course) {
                  return res.status(404).send({
                    message: 'Course not found!',
                  });
                }
                return res.status(200).send(course);
              })
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById (req, res) {
        return CourseModel
            .findById(req.params.courseId)
            .then(course => {
                if (!course) {
                  return res.status(404).send({
                    message: 'Course Not Found',
                  });
                }
                return res.status(200).send(course);
              })
              .catch(error => res.status(400).send(error));
    },

    // update an entry -> TODO: only for admins
    update (req, res) {
        CourseModel.findAll({
            where: {
                Title: req.body.Title
            }
        })
        .then((course => {
            if(course.length) {
                return res.status(400).send({
                    message: "Course already exists!"
                });
            }

        return CourseModel
            .findById(req.params.courseId)
            .then(course => {
                if (!course) {
                    return res.status(404).send({
                        message: 'Course Not Found',
                    });
                }

                
            return course
                .update({
                    Title: req.body.Title || course.Title,
		            Summary: req.body.Summary || course.Summary,
		            Description: req.body.Description || course.Description,
		            Tags: req.body.Tags || course.Tags,
		            categoryId: req.params.categoryId || course.categoryId
                })
                .then(() => res.status(200).send(course))
                .catch((error) => res.status(400).send(error));
            
                    
            })
        }))
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry -> TODO: Only for admins
    destroy (req, res) {
        return CourseModel
            .findById(req.params.courseId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'Course Not Found',
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