const QuizOptionsModel = require('../models').QuizOptions;
const QuizModel = require('../models').Quiz;
const CourseModel = require('../models').Course;
const ChapterModel = require('../models').Chapter;

module.exports = {
    // insert quizoption into QuizOptions table
    create: (req, res) => {
        if (req.body.Option != null)
            return QuizOptionsModel.create({
                Option: req.body.Option,
                isCorrect: req.body.isCorrect,
                quizId: req.query.quizId
            })
                .then(todo => res.status(201).send(todo))
                .catch(error => {
                    return res.status(400).send(error);
                });
        else {
            return res.status(406).send({
                success: false,
                message: "Option is null"
            });
        }
    },

    // get all entries from QuizOptions table
    listAll(req, res) {
        return QuizOptionsModel
            .all()
            .then(QuizOptions => res.status(200).send(QuizOptions))
            .catch(error => res.status(400).send(error));
    },

    // get all entries from QuizOptions table for a QuizID
    list(req, res) {
        return QuizOptionsModel
            .findAll({
            where: {
                quizId: req.query.quizId
                }  
            })
            .then(quizOption => {
                if (quizOption == "") {
                    return res.status(404).send({
                        success: false,
                        message: 'There are not quiz options for this quiz!',

                    });
                }
                if (!quizOption) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz Option not found!',
                    });
                }
                return res.status(200).send(quizOption);
            })
            .catch(error => {
                return res.status(400).send(error);
            })
    },

    // get an entry by id
    getById(req, res) {
        return QuizOptionsModel
            .findById(req.params.quizOptionsId)
            .then(quizOption => {
                if (!quizOption) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz Option Not Found',
                    });
                }
                return res.status(200).send(quizOption);
            })
            .catch(error => res.status(400).send(error));
    },

    // update an entry 
    update (req, res) {
        return QuizOptionsModel
            .findById(req.query.quizOptionsId)
            .then(quizOption => {
                if (!quizOption) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz Option Not Found',
                    });
                }

                return quizOption
                    .update({
                        Option: req.body.Option || quizOption.Option,
                        isCorrect: req.body.isCorrect || quizOption.isCorrect,
                        quizId: req.query.quizId
                    })
                    .then(() => res.status(200).send({
                        success: true,
                        message: "Quiz updated."
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry
    destroy (req, res) {
        return QuizOptionsModel
            .findById(req.query.quizOptionsId)
            .then(quizOption => {
                if (!quizOption) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz Option Not Found',
                    });
                }
                return quizOption
                    .destroy()
                    .then(() => res.status(200).send({
                        success: true,
                        message: "Quiz deleted."
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};