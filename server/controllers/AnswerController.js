const AnswerModel = require('../models').Answer;

const jwt = require('jsonwebtoken');
const settings = require('../config/Index');
const UserModel = require('../models').User;


module.exports = {
    // insert Answer into Answer table
    create: (req, res) => {
            return AnswerModel.create({
                quizoptionId: req.params.quizOptionsId,
                userId: req.decoded.ID
            })
                .then(answer => res.status(201).send(answer))
                .catch(error => {
                    console.log("Eroare: ", error)
                    return res.status(400).send(error);
                });
        
    },

    // get all entries from Answer table
    list(req, res) {
        /*console.log(AnswerModel.rawAttributes);
        //return AnswerModel
            .all()
            .then(answers => res.status(200).send(answers))
            .catch(error => {
                    console.log("Eroare: ", error)
                    return res.status(400).send(error);
                });*/
                return AnswerModel
                .findAll({
                    attributes: ['id', 'quizoptionId','userId']
                })
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
              where: {id: req.params.answerId},
              attributes: ['id', 'quizoptionId','userId']
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

    //todo: update

    // delete an entry
    destroy(req, res) {
        return AnswerModel
            .findOne({
              where: {id: req.params.answerId},
              attributes: ['id', 'quizoptionId','userId']
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
    }

};