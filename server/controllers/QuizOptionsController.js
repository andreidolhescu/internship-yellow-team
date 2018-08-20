const QuizOptionsModel = require('../models').QuizOptions;
const QuizModel = require('../models').Quiz;
const CourseModel = require('../models').Course;
const ChapterModel = require('../models').Chapter;

module.exports = {
    // insert quizoption into QuizOptions table
    create: (req, res) => {
        return QuizOptionsModel.create({
            Option: req.body.Option,
            isCorrect: req.body.isCorrect,
            quizId: req.params.quizId
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => {
        	console.log("Eroare: ", error)
        	return res.status(400).send(error);
        });
    },

    // get all entries from QuizOptions table for a QuizID
    list (req, res) {
        return QuizOptionsModel
            .findAll({
            where: {
                quizId: req.params.quizId
                },
                include: [{
                    model: QuizModel,
                    where: {
                        chapterId: req.params.chapterId
                    },
                    include: [{
                        model:ChapterModel,
                        where:
                        {
                            courseId: req.params.courseId
                        },
                        include: [{
                            model: CourseModel,
                            where:
                            {
                                categoryId: req.params.categoryId
                            }
                        }]
                    }]
                }]    
            })
            .then(quizOption => {
                if(quizOption == "")
                {
                    return res.status(404).send({
                    message: 'There are not quiz options for this quiz!',

                    });
                }
                if (!quizOption) {
                  return res.status(404).send({
                    message: 'Quiz Option not found!',
                  });
                }
                return res.status(200).send(quizOption);
              })
            .catch(error => {
            console.log("Error: ", error)
            return res.status(400).send(error);
        })
    },

    // get an entry by id
    getById (req, res) {
        return QuizOptionsModel
            .findById(req.params.quizOptionsId)
            .then(quizOption => {
                if (!quizOption) {
                  return res.status(404).send({
                    message: 'Quiz Option Not Found',
                  });
                }
                return res.status(200).send(quizOption);
              })
              .catch(error => res.status(400).send(error));
    },

    // update an entry -> TODO: Only for admins
    update (req, res) {
        return QuizOptionsModel
            .findById(req.params.quizOptionsId)
            .then(quizOption => {
                if (!quizOption) {
                    return res.status(404).send({
                        message: 'Quiz Option Not Found',
                    });
                }
                
            return quizOption
                .update({
                    Option: req.body.Option,
                    isCorrect: req.body.isCorrect,
                    quizId: req.params.quizId
                })
                .then(() => res.status(200).send(quizOption))
                .catch((error) => res.status(400).send(error));
            
                    
            })
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry -> TODO: Only for admins
    destroy (req, res) {
        return QuizOptionsModel
            .findById(req.params.quizOptionsId)
            .then(quizOption => {
                if (!quizOption) {
                    return res.status(404).send({
                        message: 'Quiz Option Not Found',
                    });
                }

                return quizOption
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

};