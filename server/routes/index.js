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
    app.post('/api/test', testController.create);
    app.get('/api/test', LoginController.GetToken, testController.list);

    app.post('/api/register', UserController.register);
    app.get('/api/user', LoginController.GetUserRole, UserController.list);
    app.get('/api/user/:userId', LoginController.GetUserRole, UserController.getById);
    app.put('/api/user/:userId', LoginController.GetToken, UserController.update);
    app.delete('/api/user/:userId', LoginController.GetUserRole, UserController.destroy);

    //routes for category controller
    //app.post('/api/category', CategoryController.create);
    //Creare categorie doar de admin
    app.post('/api/category', LoginController.GetUserRole, CategoryController.create);
    app.get('/api/category', LoginController.GetToken, CategoryController.list);
    app.get('/api/category/:categoryId', LoginController.GetToken, CategoryController.getById);
    app.put('/api/category/:categoryId', LoginController.GetUserRole, CategoryController.update);
    app.delete('/api/category/:categoryId', LoginController.GetUserRole, CategoryController.destroy);

    //routes for course controller
    app.post('/api/category/:categoryId/course', LoginController.GetUserRole, CourseController.create);
    app.get('/api/category/:categoryId/course', LoginController.GetToken, CourseController.list);
    app.get('/api/category/:categoryId/course/:courseId', LoginController.GetToken, CourseController.getById);
    app.put('/api/category/:categoryId/course/:courseId', LoginController.GetUserRole, CourseController.update);
    app.delete('/api/category/:categoryId/course/:courseId', LoginController.GetUserRole, CourseController.destroy);

    //routes for chapter controller
    app.post('/api/category/:categoryId/course/:courseId/chapter', LoginController.GetUserRole, ChapterController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter', LoginController.GetToken, ChapterController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId', LoginController.GetToken, ChapterController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId', LoginController.GetUserRole, ChapterController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId', LoginController.GetUserRole, ChapterController.destroy);

    //routes for quiz controller
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz', LoginController.GetUserRole, QuizController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz', LoginController.GetToken, QuizController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', LoginController.GetToken, QuizController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', LoginController.GetUserRole, QuizController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId', LoginController.GetUserRole, QuizController.destroy);

    //routes for quiz options controller
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions', LoginController.GetUserRole, QuizOptionsController.create);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions', LoginController.GetToken, QuizOptionsController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', LoginController.GetToken, QuizOptionsController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', LoginController.GetUserRole, QuizOptionsController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', LoginController.GetUserRole, QuizOptionsController.destroy);

    //routes for answer controller -> WHAT ROUTES??????
    app.post('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId/answer', LoginController.GetUserRole, QuizOptionsController.create);
    /*app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions', QuizOptionsController.list);
    app.get('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.getById);
    app.put('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.update);
    app.delete('/api/category/:categoryId/course/:courseId/chapter/:chapterId/quiz/:quizId/quizOptions/:quizOptionsId', QuizOptionsController.destroy);
*/

    //routes for image controller

    app.post('/api/user/:userId/image', LoginController.GetToken, ImageController.create); // insert an user image
    app.post('/api/category/:categoryId/course/:courseId/image', LoginController.GetUserRole, ImageController.create); // insert a course image
    app.get('/api/image', LoginController.GetUserRole, ImageController.list); // list all images
    //TODO: List all users images
    app.get('/api/usr/images', LoginController.GetUserRole, ImageController.userlist);
    //TODO: List images for courses
    app.get('/api/curs/images', LoginController.GetToken, ImageController.curslist);
    app.get('/api/image/:imageId', LoginController.GetToken, ImageController.getById);
    app.put('/api/user/:userId/image/:imageId', LoginController.GetToken, ImageController.update);//update a user image
    app.put('/api/category/:categoryId/course/:courseId/image/:imageId', LoginController.GetUserRole, ImageController.update);//update a course image
    app.delete('/api/image/:imageId', LoginController.GetUserRole, ImageController.destroy);

    //Login Route
    app.post('/api/login', LoginController.login);
    app.get('/api/login', LoginController.GetToken, UserController.list);
    app.get('/api/logout', LoginController.InitialPage);

    //Mail send Rout
    /*app.post('/api/mail', MailController.SendMail);
    app.get('/api/mail', MailController.GetOK);*/

    //ResetPassword Rout
    app.post('/api/reset', ResetPasswordController.SendToken);
    app.get('/api/reset/:token', ResetPasswordController.VerifyToken, ResetPasswordController.Redirect);
    app.get('/api/reset/:token/change', ResetPasswordController.VerifyToken, ResetPasswordController.ChangePassword);
    app.post('/api/reset/:token/change', ResetPasswordController.VerifyToken, ResetPasswordController.NewPassword);

    //Add user token and mail for reset password
    //app.post('/api/reset/add', UserTokenController.createWithParameters);
    app.get('/api/reset/all', LoginController.GetUserRole, UserTokenController.list);
    app.get('/api/reset/:id', LoginController.GetUserRole, UserTokenController.destroy);
}