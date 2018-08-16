const ChapterModel = require('../models').Chapter;

module.exports = {
    // insert chapter into chapter table
    create (req, res) {
        return ChapterModel
            .create({
                Title: req.body.Title,
                Content: req.body.Content,
                courseId: req.body.courseId
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    // get all entries from Chapter table
    list (req, res) {
        return ChapterModel
            .all()
            .then(todos => res.status(200).send(todos))
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

    // update an entry
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
			            courseId: req.body.courseId
                    })
                    .then(() => res.status(200).send(chapter))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    // delete an entry
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