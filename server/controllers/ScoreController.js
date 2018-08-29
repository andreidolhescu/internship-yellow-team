const AnswerModel = require('../models').Answer;
const QuizOptionsModel = require('../models').QuizOptions;
const QuizModel = require('../models').Quiz;
const ChapterModel = require('../models').Chapter;
const CourseModel = require('../models').Course;


module.exports = {

    GetScoreChapter(req, res) {
        AnswerModel.findAndCountAll({
            include: [{
                model: QuizOptionsModel,
                where:
                {
                    isCorrect: true,
                },
                required: true
            }],
            where: {
                userId: req.decoded.ID,
                chapterId: req.query.chapterId,
            },
        })
            .then(answers => res.status(200).send(answers))
            .catch(error => {
                return res.status(400).send(error);
            });
    },

    GetScoreCourse(req, res) {
        AnswerModel.findAndCountAll({
            include: [{
                model: QuizOptionsModel,
                where:
                {
                    isCorrect: true,
                },
                required: true,
                include: [{
                    model: QuizModel,
                    required: true,
                    include: [{
                        model: ChapterModel,
                        where:
                        {
                            courseId: req.query.courseId,
                        },
                        required: true,
                        include: [{
                            model: CourseModel,
                            where:
                            {
                                categoryId: req.query.categoryId
                            },
                            required: true,
                        }]
                    }]
                }]
            }],
            where: {
                userId: req.decoded.ID,
            },
        })
            .then(answers => res.status(200).send(answers))
            .catch(error => {
                return res.status(400).send(error);
            });
    },

    GetUserScore(req, res) {
        AnswerModel.findAndCountAll({
            where: {
                userId: req.decoded.ID,
            },
            include: [{
                model: QuizOptionsModel,
                where:
                {
                    isCorrect: true,
                },
                required: true,
            }]
        })
            .then(answers => res.status(200).send(answers))
            .catch(error => {
                return res.status(400).send(error);
            });
    },

    GetScoreChapterMax(req, res) {
        QuizModel.findAndCountAll({
            where: {
                chapterId: req.query.chapterId,
            },
        })
            .then(answers => {
                res.status(200).send({
                    count: answers.count
                })
            })
            .catch(error => {
                return res.status(400).send(error);
            });
    },

    getScoreCourseMax(req, res) {
        QuizModel.findAndCountAll({
            /*include: [{
                model: QuizOptionsModel,
                required: true
            }],*/
            include: [{
                model: ChapterModel,
                where: {
                    courseId: req.query.courseId
                }
            }]
        })
            .then(answers => {
                res.status(200).send({
                    count: answers.count
                })
            })
            .catch(error => {
                console.log(error);
                return res.status(400).send(error);
            });
    }

}