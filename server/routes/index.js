const cors = require('cors'); // do not remove this

const testController = require('../controllers').testController;
const UserController = require('../controllers').UserController;
const CategoryController = require('../controllers').CategoryController;
const CourseController = require('../controllers').CourseController;
const ChapterController = require('../controllers').ChapterController;
const LoginController = require('../controllers').LoginController;
const QuizController = require('../controllers').QuizController;
const QuizOptionsController = require('../controllers').QuizOptionsController;
const AnswerController = require('../controllers').AnswerController;
const MailController = require('../controllers').MailController;
const ResetPasswordController = require('../controllers').ResetPasswordController;
const UserTokenController = require('../controllers').UserTokenController;

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


    app.post('/api/register', UserController.register);
    app.get('/api/user', UserController.list);
    app.get('/api/user/:userId', UserController.getById);
    app.put('/api/user/:userId', UserController.update);
    app.delete('/api/user/:userId', UserController.destroy);

    //routes for category controller
    //app.post('/api/category', CategoryController.create);
    //Creare categorie doar de admin
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

    //routes for quiz options controller
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions', QuizOptionsController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions', QuizOptionsController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.destroy);

    //routes for answer controller -> WHAT ROUTES??????
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId/answer', QuizOptionsController.create);
    /*app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions', QuizOptionsController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.destroy);
*/
    //Login Route
    app.post('/api/login', LoginController.login);
    app.get('/api/login', LoginController.GetToken, UserController.list);

    //Mail send Rout
    app.post('/api/mail', MailController.SendMail);
    app.get('/api/mail', MailController.GetOK);

    //ResetPassword Rout
    app.post('/api/reset', ResetPasswordController.SendToken);
    app.get('/api/reset/:token', ResetPasswordController.VerifyToken, ResetPasswordController.Redirect);
    app.get('/api/reset/:token/change', ResetPasswordController.VerifyToken, ResetPasswordController.ChangePassword);
    app.post('/api/reset/:token/change', ResetPasswordController.VerifyToken, ResetPasswordController.NewPassword);

    //Add user token and mail for reset password
    //app.post('/api/reset/add', UserTokenController.createWithParameters);
    app.get('/api/reset/all', UserTokenController.list);
    app.get('/api/reset/:id', UserTokenController.destroy);
}