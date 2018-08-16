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
        console.log(req.body.Summary)
        console.log(req.body.Description)
        console.log(req.body.Tags)
        console.log(req.body.Image)
        console.log(req.params.categoryId)
        return CourseModel.create({
            Title: req.body.Title,
            Summary: req.body.Summary,
            Description: req.body.Description,
            Tags: req.body.Tags, // TO DO: A table for tags
            Image: req.body.Image,
            categoryId: req.params.categoryId
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => {
        	console.log("dssdv", error)
        	return res.status(400).send(error);
        });

        
        }))
        .catch(error => {
        	console.log("dssdv", error)
        	return res.status(400).send(error);
        });
    },
    

    // get all entries from Course table
    list (req, res) {
        return CourseModel
            .all()
            .then(todos => res.status(200).send(todos))
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

    // update an entry
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
                    Title: req.body.Title,
		            Summary: req.body.Summary,
		            Description: req.body.Description,
		            Tags: req.body.Tags, // TO DO: A table for tags
		            Image: req.body.Image,
		            categoryId: req.params.categoryId
                })
                .then(() => res.status(200).send(course))
                .catch((error) => res.status(400).send(error));
            
                    
            })
        }))
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry
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