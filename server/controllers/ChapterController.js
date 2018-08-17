const ChapterModel = require('../models').Chapter;

module.exports = {
    // insert chapter into chapter table
    create (req, res) {
        return ChapterModel
            .findAll({
            where: {
                courseId: req.params.courseId
                }
        })
            .then(chapter => {
                if(chapter == "")
                {
                    return res.status(404).send({
                    message: 'There are no chapters for this course!',

                    });
                }
                if (!chapter) {
                  return res.status(404).send({
                    message: 'Chapter not found!',
                  });
                }
                return res.status(200).send(chapter);
              })
            .catch(error => res.status(400).send(error));
    },

    // get all entries from Chapter table for a courseid
    list (req, res) {
        return ChapterModel
            .findById(req.params.courseId)
            .then(course => {
                if (!course) {
                  return res.status(404).send({
                    message: 'Course Not Found',
                  });
                }
                return res.status(200).send(course);
              })
            .catch(error => res.status(400).send(error));
    },

    // get an entry by id
    getById (req, res) {
        return ChapterModel
            .findById(req.params.chapterId)
            .then(chapter => {
                if (!chapter) {
                  return res.status(404).send({
                    message: 'Chapter Not Found',
                  });
                }
                return res.status(200).send(chapter);
              })
              .catch(error => res.status(400).send(error));
    },

    // update an entry -> TODO: Only for admins
    update (req, res) {
        return ChapterModel
            .findById(req.params.chapterId)
            .then(chapter => {
                if (!chapter) {
                    return res.status(404).send({
                        message: 'Chapter Not Found',
                    });
                }

                return chapter
                    .update({
                        Title: req.body.Title,
			            Content: req.body.Content,
			            courseId: req.params.courseId
                    })
                    .then(() => res.status(200).send(chapter))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry -> TODO: Only for Admins
    destroy (req, res) {
        return ChapterModel
            .findById(req.params.chapterId)
            .then(chapter => {
                if (!chapter) {
                    return res.status(404).send({
                        message: 'Chapter Not Found',
                    });
                }

                return chapter
                    .destroy()
                    .then(() => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

};