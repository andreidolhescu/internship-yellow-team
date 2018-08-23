const CategoryModel = require('../models').Category;
const settings = require('../config/Index');
const JWT = require('jsonwebtoken');
var err = '';


module.exports = {
    //Create category, only for admin
    create(req, res) {

        err = '';
        if (String(req.body.CategoryName).length == 0 || req.body.CategoryName == null)
            err += 'Undefined Category. ';

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
                    .then(todo => res.status(201).send({
                        message: "Category created."
                    }))
                    .catch(error => res.status(400).send(error));
            }))
        }
        else {
            return res.status(404).send({
                message: err,
            });
        }
    },

    // get all entries from Category table
    list(req, res) {
        return CategoryModel
            .all()
            .then(todo => res.status(200).send(todo))
            .catch(error => res.status(400).send(error));
    },

    // get category by id
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

    // update category
    update(req, res) {
        err = '';

        if (String(req.body.CategoryName).length == 0 || req.body.CategoryName == null)
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
                                    CategoryName: req.body.CategoryName || category.CategoryName,
                                    Background: req.body.Background || category.Background
                                })
                                .then(() => res.status(200).send({
                                    message: "Update done."
                                }))
                                .catch((error) => res.status(400).send(error));
                        }
                        else
                            return res.status(400).send({
                                message: err,
                            });

                    })
            }))
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry -> TODO: Only for admins
    destroy(req, res) {
        return CategoryModel
            .findById(req.params.categoryId)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }

                return category
                    .destroy()
                    .then(() => res.status(200).send({
                        message: "Category deleted"
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};