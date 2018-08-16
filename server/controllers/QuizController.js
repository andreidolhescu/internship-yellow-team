const QuizModel = require('../models').Quiz;

module.exports = {
    // insert quiz into Quiz table
    create: (req, res) => {
        return QuizModel.create({
            Question: req.body.Question,
            chapterId: req.params.chapterId
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => {
        	console.log("dssdv", error)
        	return res.status(400).send(error);
        });
    },

    // get all entries from Quiz table
    list (req, res) {
        return QuizModel
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById (req, res) {
        return QuizModel
            .findById(req.params.quizId)
            .then(quiz => {
                if (!quiz) {
                  return res.status(404).send({
                    message: 'Quiz Not Found',
                  });
                }
                return res.status(200).send(quiz);
              })
              .catch(error => res.status(400).send(error));
    },

    // update an entry
    update (req, res) {
        return QuizModel
            .findById(req.params.quizId)
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }
                
            return quiz
                .update({
                    Question: req.body.Question,
                    chapterId: req.params.chapterId
                })
                .then(() => res.status(200).send(quiz))
                .catch((error) => res.status(400).send(error));
            
                    
            })
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry
    destroy (req, res) {
        return QuizModel
            .findById(req.params.quizId)
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }

                return quiz
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

};