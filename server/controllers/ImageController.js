const ImageModel = require('../models').Image;

module.exports = {
    // insert image into Image table -> TREBUIE FACUT SEPARARE INTRE CURS SI USER
    create: (req, res) => {
        return ImageModel.create({
            Question: req.body.Question,
            chapterId: req.params.chapterId
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => {
        	console.log("Eroare: ", error)
        	return res.status(400).send(error);
        });
    },

    // get all entries from Quiz table
    list (req, res) {
        return QuizModel
            .findAll({
            where: {
                chapterId: req.params.chapterId
                }
        })
            .then(quiz => {
                if(quiz == "")
                {
                    return res.status(404).send({
                    message: 'There are not quizzes for this chapter!',

                    });
                }
                if (!quiz) {
                  return res.status(404).send({
                    message: 'Quiz not found!',
                  });
                }
                return res.status(200).send(quiz);
              })
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

    // update an entry -> TODO: Only for admins
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

    // delete an entry -> TODO: Only for admins
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