const QuizModel = require('../models').Quiz;
const CourseModel = require('../models').Course;
const ChapterModel = require('../models').Chapter;
const QuizOptions = require('../models').QuizOptions;

module.exports = {
    // insert quiz into Quiz table
    create: (req, res) => {
        if (req.body.Question != null)
            return QuizModel.create({
                Question: req.body.Question,
                chapterId: req.query.chapterId
            })
                .then(todo => res.status(201).send({
                    success: true,
                    message: "Quiz created."
                }))
                .catch(error => {
                    return res.status(400).send(error);
                });
        else {
            return res.status(404).send({
                success: false,
                message: 'There are not quizzes for this chapter!',
            });
        }
    },

    // get all entries from Quiz table
    list(req, res) {
        return QuizModel
            .findAll({
                where: {
                    chapterId: req.query.chapterId
                }
            })
            .then(quiz => {
                if (quiz == "") {
                    return res.status(404).send({
                        success: false,
                        message: 'There are not quizzes for this chapter!',
                    });
                }
                if (!quiz) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz not found!',
                    });
                }
                return res.status(200).send(quiz);
            })
            .catch(error => {
                return res.status(400).send(error);
            });
    },

    // get an entry by id
    getById(req, res) {
        return QuizModel
            .findById(req.params.quizId)
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz Not Found',
                    });
                }
                return res.status(200).send(quiz);
            })
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return QuizModel
            .findById(req.query.quizId)
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz Not Found',
                    });
                }

                return quiz
                    .update({
                        Question: req.body.Question || quiz.Question,
                        chapterId: req.query.chapterId
                    })
                    .then(() => res.status(200).send({
                        success: true,
                        message: "Updated."
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        return QuizModel
            .findById(req.query.quizId)
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz Not Found',
                    });
                }
                return quiz
                    .destroy()
                    .then(() => res.status(200).send({
                        success: true,
                        message: "Deleted."
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    getTestQuiz(req, res) {
        return QuizModel
            .findAll({
                where: {
                    chapterId: req.query.chapterId
                },
                include: {
                    model: QuizOptions,
                    as: "quizOptions"/*,
                    include: {
                        model: 
                    }*/
                }
            })
            .then(quiz => {
                if (quiz == "") {
                    return res.status(404).send({
                        success: false,
                        message: 'There are not quizzes for this chapter!',
                    });
                }
                if (!quiz) {
                    return res.status(404).send({
                        success: false,
                        message: 'Quiz not found!',
                    });
                }

                return res.status(200).send(quiz);
            })
            .catch(error => {
                console.log(error)
                return res.status(400).send(error);
            });
    }
};