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
const ImageController = require('../controllers').ImageController;
const ScoreController = require('../controllers').ScoreController;

module.exports = (app) => {

    app.use(cors()); // do not remove this

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Internship',
    }));

    // start examples
    // the following routes are only for guidance, you can remove them
    /*app.post('/api/test', testController.create);
    app.get('/api/test', testController.list);
    app.get('/api/test/:testId', testController.getById);
    app.put('/api/test/:testId', testController.update);
    app.delete('/api/test/:testId', testController.destroy);*/
    app.post('/api/test', LoginController.IsAdminOrUser, testController.create);
    app.get('/api/test', LoginController.IsAdminOrUser, testController.list);

    app.post('/api/register', UserController.register);
    app.get('/api/user', LoginController.IsAdmin, UserController.list);
    app.get('/api/user/about', LoginController.IsAdminOrUser, UserController.about);
    app.get('/api/user/:userId', LoginController.IsAdmin, UserController.getById);
    app.put('/api/user/', LoginController.IsAdminOrUser, UserController.update);
    //Uprade or downgrade user to admin and revers
    app.put('/api/user/change/:userId', LoginController.IsAdmin, UserController.change);
    app.delete('/api/user/:userId', LoginController.IsAdmin, UserController.destroyId);
    app.delete('/api/user/', LoginController.IsAdminOrUser, UserController.destroy);

    //routes for category controller
    //app.post('/api/category', CategoryController.create);
    //Creare categorie doar de admin
    app.post('/api/category', LoginController.IsAdmin, CategoryController.create);
    app.get('/api/category', LoginController.IsAdminOrUser, CategoryController.list);
    app.get('/api/category/:categoryId', LoginController.IsAdminOrUser, CategoryController.getById);
    app.put('/api/category/:categoryId', LoginController.IsAdmin, CategoryController.update);
    app.delete('/api/category/:categoryId', LoginController.IsAdmin, CategoryController.destroy);

    //routes for course controller
    app.post('/api/category/:categoryId/course', LoginController.IsAdmin, CourseController.create);
    app.get('/api/category/:categoryId/course', LoginController.IsAdminOrUser, CourseController.list);
    app.get('/api/category/:categoryId/course/:courseId', LoginController.IsAdminOrUser, CourseController.getById);
    app.put('/api/category/:categoryId/course/:courseId', LoginController.IsAdmin, CourseController.update);
    app.delete('/api/category/:categoryId/course/:courseId', LoginController.IsAdmin, CourseController.destroy);

    //routes for chapter controller
    app.post('/api/category/:categoryId/course/:courseId/chapter', LoginController.IsAdmin, ChapterController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter', LoginController.IsAdminOrUser, ChapterController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId', LoginController.IsAdminOrUser, ChapterController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId', LoginController.IsAdmin, ChapterController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId', LoginController.IsAdmin, ChapterController.destroy);

    //routes for quiz controller
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz', LoginController.IsAdmin, QuizController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz', LoginController.IsAdminOrUser, QuizController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', LoginController.IsAdminOrUser, QuizController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', LoginController.IsAdmin, QuizController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', LoginController.IsAdmin, QuizController.destroy);

    //routes for quiz options controller
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions', LoginController.IsAdmin, QuizOptionsController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions', LoginController.IsAdminOrUser, QuizOptionsController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', LoginController.IsAdminOrUser, QuizOptionsController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', LoginController.IsAdmin, QuizOptionsController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', LoginController.IsAdmin, QuizOptionsController.destroy);

    //routes for answer controller -> WHAT ROUTES??????
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId/answer', LoginController.IsAdminOrUser, AnswerController.create);
    app.get('/api/answers', AnswerController.list); // list all answers
    app.get('/api/answers/:answerId', AnswerController.getById);
    app.delete('/api/answers/:answerId', AnswerController.destroy);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/answer', LoginController.IsAdminOrUser, AnswerController.deleteforchapter);

    //routes for image controller
    app.post('/api/user/:userId/image', LoginController.IsAdminOrUser, ImageController.create); // insert an user image
    app.post('/api/category/:categoryId/course/:courseId/image', LoginController.IsAdmin, ImageController.create); // insert a course image
    app.get('/api/image', LoginController.IsAdmin, ImageController.list); // list all images
    // List all users images
    app.get('/api/usr/images', LoginController.IsAdmin, ImageController.userlist);
    // List images for courses
    app.get('/api/curs/images', LoginController.IsAdminOrUser, ImageController.curslist);
    app.get('/api/image/:imageId', LoginController.IsAdminOrUser, ImageController.getById);
    app.put('/api/user/:userId/image/:imageId', LoginController.IsAdminOrUser, ImageController.update);//update a user image
    app.put('/api/category/:categoryId/course/:courseId/image/:imageId', LoginController.IsAdmin, ImageController.update);//update a course image
    app.delete('/api/image/:imageId', LoginController.IsAdmin, ImageController.destroy);

    //Login Route
    app.post('/api/login', LoginController.login);
    app.get('/api/login', LoginController.IsAdminOrUser, UserController.list);
    app.get('/api/logout', LoginController.InitialPage);

    //Mail send Rout, only for testing
    /*app.post('/api/mail', MailController.SendMail);
    app.get('/api/mail', MailController.GetOK);*/

    //ResetPassword Rout
    app.post('/api/reset', ResetPasswordController.SendToken);
    app.get('/api/reset/:token', ResetPasswordController.VerifyToken, ResetPasswordController.ChangePassword);
    app.post('/api/reset/:token', ResetPasswordController.VerifyToken, ResetPasswordController.NewPassword);

    //Add user token and mail for reset password
    //app.post('/api/reset/add', UserTokenController.createWithParameters);
    //Only for testing
    /*app.get('/api/reset/all', LoginController.IsAdmin, UserTokenController.list);
    app.get('/api/reset/:id', LoginController.IsAdmin, UserTokenController.destroy);*/

    //Score -> GetScore // SetScore
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/score', LoginController.IsAdminOrUser, ScoreController.SetScore);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/score', LoginController.IsAdminOrUser, ScoreController.GetScore);
}