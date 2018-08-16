const AnswerModel = require('../models').Answer;

module.exports = {
    // insert Answer into Answer table
    create: (req, res) => {
        return AnswerModel.create({
            quizOptionsId: req.params.quizOptionsId,
            //TODO UserId: de preluat jwt  
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => {
        	console.log("dssdv", error)
        	return res.status(400).send(error);
        });
    },

    // get all entries from Answer table
    list (req, res) {
        return AnswerModel
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById (req, res) {
        return AnswerModel
            .findById(req.params.answerId)
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
    destroy (req, res) {
        return AnswerModel
            .findById(req.params.answerId)
            .then(answer => {
                if (!answer) {
                    return res.status(404).send({
                        message: 'Answer Not Found',
                    });
                }

                return answer
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

};