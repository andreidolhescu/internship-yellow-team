const cors = require('cors'); // do not remove this

const testController = require('../controllers').testController;
const UserController = require('../controllers').UserController;
const CategoryController = require('../controllers').CategoryController;
const CourseController = require('../controllers').CourseController;
const ChapterController = require('../controllers').ChapterController;
const QuizController = require('../controllers').QuizController;

module.exports = (app) => {

    app.use(cors()); // do not remove this

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Internship',
    }));

    // start examples
    // the following routes are only for guidance, you can remove them
    app.post('/api/test', testController.create);
    app.get('/api/test', testController.list);
    app.get('/api/test/:testId', testController.getById);
    app.put('/api/test/:testId', testController.update);
    app.delete('/api/test/:testId', testController.destroy);


    app.post('/api/register', UserController.create);
    app.get('/api/user', UserController.list);
    app.get('/api/user/:userId', UserController.getById);
    app.put('/api/user/:userId', UserController.update);
    app.delete('/api/user/:userId', UserController.destroy);

    //routes for category controller
    app.post('/api/category', CategoryController.create);
    app.get('/api/category', CategoryController.list);
    app.get('/api/category/:categoryId', CategoryController.getById);
    app.put('/api/category/:categoryId', CategoryController.update);
    app.delete('/api/category/:categoryId', CategoryController.destroy);

    //routes for course controller
    app.post('/api/category/:categoryId/course', CourseController.create);
    app.get('/api/category/:categoryId/course', CourseController.list);
    app.get('/api/category/:categoryId/course/:courseId', CourseController.getById);
    app.put('/api/category/:categoryId/course/:courseId', CourseController.update);
    app.delete('/api/category/:categoryId/course/:courseId', CourseController.destroy);

    //routes for chapter controller
    app.post('/api/category/:categoryId/course/:courseId/chapter', ChapterController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter', ChapterController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId', ChapterController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId', ChapterController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId', ChapterController.destroy);

    //routes for quiz controller
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz', QuizController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz', QuizController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', QuizController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', QuizController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', QuizController.destroy);


    // end examples
}