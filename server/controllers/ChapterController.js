const ChapterModel = require('../models').Chapter;
const CourseModel = require('../models').Course;

module.exports = {
    // insert chapter into chapter table
    create(req, res) {
        if (req.body.Title != null && req.body.Content != null)
            return ChapterModel
                .create({
                    Title: req.body.Title,
                    Content: req.body.Content,
                    courseId: req.query.courseId
                })
                .then(todo => res.status(201).send({
                    success: true,
                    message: "Chapter created"
                }))
                .catch(error => res.status(400).send(error));
        else {
            return res.status(406).send({
                success: false,
                message: 'Need Title and Content',
            });
        }
    },

    // get all entries from Chapter table for a courseid
    list(req, res) {
        return ChapterModel
            .findAll({
               where: {
                 courseId: req.query.courseId
               }
            })
            .then(chapter => {
                if (chapter == "") {
                    return res.status(404).send({
                        success: false,
                        message: 'There are no chapters for this course!',
                    });
                }
                if (!chapter) {
                    return res.status(404).send({
                        success: false,
                        message: 'Chapter not found!',
                    });
                }
                return res.status(200).send(chapter);
            })
            .catch(error => {
                return res.status(400).send(error);
            });
    },

    // get an entry by id
    getById(req, res) {
        return ChapterModel
            .findById(req.params.chapterId)
            .then(chapter => {
                if (!chapter) {
                    return res.status(404).send({
                        success: false,
                        message: 'Chapter Not Found',
                    });
                }
                return res.status(200).send(chapter);
            })
            .catch(error => res.status(400).send(error));
    },

    update (req, res) {
        return ChapterModel
            .findById(req.query.chapterId)
            .then(chapter => {
                if (!chapter) {
                    return res.status(404).send({
                        success: false,
                        message: 'Chapter Not Found',
                    });
                }
                return chapter
                    .update({
                        Title: req.body.Title || chapter.Title,
      			            Content: req.body.Content || chapter.Content,
      			            courseId: req.query.courseId
                    })
                    .then(() => res.status(200).send(chapter))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy (req, res) {
        return ChapterModel
            .findById(req.query.chapterId)
            .then(chapter => {
                if (!chapter) {
                    return res.status(404).send({
                        success: false,
                        message: 'Chapter Not Found',
                    });
                }
                return chapter
                    .destroy()
                    .then(() => res.status(200).send({
                        success: true,
                        message: "Chapter deleted."
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};