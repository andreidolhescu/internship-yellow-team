// this controller it's just an example, 
// remove or keep it for guidance

const CategoryModel = require('../models').Category;
var err = '';


module.exports = {
    create(req, res) {
        err = '';

        if (String(req.body.CategoryName).length == 0)
            err += 'Undefined Category.';

        if (String(err).length == 0) {

            CategoryModel.findAll({
                where: {
                    CategoryName: req.body.CategoryName,
                }
            }).then((category => {
                if (category.length) {
                    return res.status(404).send({
                        message: "Category already exist",
                    });
                }
                return CategoryModel
                    .create(
                        {
                            CategoryName: req.body.CategoryName,
                            Background: req.body.Background
                        })
                    .then(todo => res.status(201).send(todo))
                    .catch(error => res.status(400).send(error));
            }))
        }
        else {
            return res.status(404).send({
                message: err,
            });
        }
    },

    // get all entries from Test table
    list(req, res) {
        return CategoryModel
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById(req, res) {
        return CategoryModel
            .findById(req.params.categoryId)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }
                return res.status(200).send(category);
            })
            .catch(error => res.status(400).send(error));
    },

    // update an entry

    update(req, res) {
        err = '';

        if (String(req.body.CategoryName).length == 0)
            err += 'Undefined Category.';


            CategoryModel.findAll({
            where: {
                CategoryName: req.body.CategoryName
            }
        })
            .then((category => {
                if (category.length) {
                    return res.status(400).send({
                        message: "Category already exists!"
                    });
                }

                return CategoryModel
                    .findById(req.params.categoryId)
                    .then(category => {
                        if (!category) {
                            return res.status(404).send({
                                message: 'Category Not Found',
                            });
                        }

                        if (String(err) == String("")) {
                            return category
                                .update({
                                    CategoryName: req.body.CategoryName,
                                    Background: req.body.Background
                                })
                                .then(() => res.status(200).send(category))
                                .catch((error) => res.status(400).send(error));
                        }
                        else
                            return res.status(404).send({
                                message: err,
                            });

                    })
            }))
            .catch((error) => res.status(400).send(error));
    },


    // delete an entry
    destroy(req, res) {
        return CategoryModel
            .findById(req.params.categoryId)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
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