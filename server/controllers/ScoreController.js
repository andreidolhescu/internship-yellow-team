const AnswerModel = require('../models').Answer;
const QuizOptionsModel = require('../models').QuizOptions;
const QuizModel = require('../models').Quiz;
const ChapterModel = require('../models').Chapter;
const CourseModel = require('../models').Course;


module.exports = {

    GetScoreChapter(req,res)
    {
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
            chapterId: req.params.chapterId,
            }, 
        })
        .then(answers => res.status(200).send(answers))
            .catch(error => {
                    console.log("Eroare: ", error)
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
                    model:QuizModel,
                    required:true,

                    include: [{
                        model: ChapterModel,
                        where:
                        {
                            courseId: req.params.courseId,
                        },
                        required: true,

                        include: [{
                           model: CourseModel,
                           where:
                           {
                               categoryId: req.params.categoryId
                           },
                           required: true,
                       }]
                    }]
               }]
           }],

           where: {
                userId: req.decoded.ID,
                // chapterId: req.params.chapterId,
            }, 
        

       })
        .then(answers => res.status(200).send(answers))
            .catch(error => {
                    console.log("Eroare: ", error)
                    return res.status(400).send(error);
                });
    }

/* TODO
    GetScoreUser(req, res) {
        AnswerModel.findAndCountAll({
            where: {
                userId: req.decoded.ID,
                // chapterId: req.params.chapterId,
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
                    console.log("Eroare: ", error)
                    return res.status(400).send(error);
                });
    }*/
}