const QuizOptionsModel = require('../models').QuizOptions;

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
        	console.log("dssdv", error)
        	return res.status(400).send(error);
        });
    },

    // get all entries from QuizOptions table
    list (req, res) {
        return QuizOptionsModel
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
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

    // update an entry
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

    // delete an entry
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