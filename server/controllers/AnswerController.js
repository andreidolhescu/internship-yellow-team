const AnswerModel = require('../models').Answer;
const QuizOptionsModel = require('../models').QuizOptions;
const QuizModel = require('../models').Quiz;
const CourseModel = require('../models').Course;
const ChapterModel = require('../models').Chapter;
const jwt = require('jsonwebtoken');
const settings = require('../config/Index');
const UserModel = require('../models').User;


module.exports = {
    // insert Answer into Answer table
    create: (req, res) => {
        return AnswerModel.create({
                    userId: req.decoded.ID,
                    quizoptionId: req.query.quizOptionsId,
                    quiz_answerId: req.query.quizId,
                    chapterId: req.query.chapterId
                })
            .then(answer => res.status(201).send(answer))
            .catch(error => {
                console.log("Eroare: ", error)
                return res.status(400).send(error);
            });
    },

    // get all entries from Answer table
    list(req, res) {
        return AnswerModel
                .findAll()
                .then(answers => res.status(200).send(answers))
            .catch(error => {
                    console.log("Eroare: ", error)
                    return res.status(400).send(error);
                });
    },

    // get an entry by id
    getById(req, res) {
        return AnswerModel
            .findOne({
              where: {id: req.params.answerId}
            })
            .then(answer => {
                if (!answer) {
                    return res.status(404).send({
                        message: 'Answer Not Found',
                    });
                }
                return res.status(200).send(answer);
            })
            .catch(error => res.status(400).send(error));
    },

    // delete an entry
    destroy(req, res) {
        return AnswerModel
            .findOne({
              where: {id: req.query.answerId}
            })
            .then(answer => {
                if (!answer) {
                    return res.status(404).send({
                        message: 'Answer Not Found',
                    });
                }

                return answer
                    .destroy()
                    .then(() => res.status(200).send({message: "Deleted",}))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    //delete all answers for a chapter
    deleteforchapter(req, res) {
        return AnswerModel
        .destroy({
            where: {chapterId: req.query.chapterId}
        })

        .then(() => res.status(200).send({message: "Deleted",}))
        .catch(error => {
                        console.log("Eroare: ", error)
                        return res.status(400).send(error);
                    });
        }

};