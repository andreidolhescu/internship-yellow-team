// this controller it's just an example, 
// remove or keep it for guidance

const TestModel = require('../models').Test;


module.exports = {


    // insert name into Test table
    create(req, res) {

        return TestModel
            .create({
                name: "Carl"
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));

    },

    // get all entries from Test table
    list(req, res) {
        return TestModel
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById(req, res) {
        return TestModel
            .findById(req.params.testId)
            .then(test => {
                if (!test) {
                    return res.status(404).send({
                        success: false,
                        message: 'Test Not Found',
                    });
                }
                return res.status(200).send(test);
            })
            .catch(error => res.status(400).send(error));
    },

    // update an entry
    update(req, res) {
        return TestModel
            .findById(req.params.testId)
            .then(test => {
                if (!test) {
                    return res.status(404).send({
                        success: false,
                        message: 'Test Not Found',
                    });
                }

                return test
                    .update({
                        name: req.body.name || test.name,
                    })
                    .then(() => res.status(200).send(test))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry
    destroy(req, res) {
        return TestModel
            .findById(req.params.testId)
            .then(test => {
                if (!test) {
                    return res.status(404).send({
                        success: false,
                        message: 'Test Not Found',
                    });
                }

                return test
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

};