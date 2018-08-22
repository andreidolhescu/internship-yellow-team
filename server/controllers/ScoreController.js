const AnswerModel = require('../models').answer;
const QuizOptionsModel = require('../models').QuizOptions;
const QuizModel = require('../models').Quiz;
const ChapterModel = require('../models').Chapter;


module.exports = {

    GetScore(req,res)
    {
        
    },

    SetScore(req,res)
    {
        AnswerModel.findAll({
            Where: {
            userId: req.decoded.ID,
            chapterId: req.params.chapterId
            }})
            .then((answer =>{
                var tmp = "";
                answer.forEach(element => {
                    tmp += element
                });
            }))
            .catch((err =>{
                return res.status(404).send({
                    message:"Not found quiz option"
                })
            }))
    }
}