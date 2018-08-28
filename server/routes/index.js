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
const ScoreController = require('../controllers').ScoreController;
const ImagesController = require('../controllers').ImagesController;

module.exports = (app) => {

    app.use(cors()); 

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Internship',
    }));

    app.post('/api/test', LoginController.IsAdminOrUser, testController.create);
    app.get('/api/test', LoginController.IsAdminOrUser, testController.list);

    app.post('/api/register', UserController.register);
    app.get('/api/user', LoginController.IsAdmin, UserController.list);
    app.post('/api/user/image', LoginController.IsAdminOrUser, UserController.uploadImage);
    app.get('/api/user/about', LoginController.IsAdminOrUser, UserController.about);
    app.get('/api/user/:userId', LoginController.IsAdmin, UserController.getById);
    app.put('/api/user/:userId', LoginController.IsAdmin, UserController.updateById)
    app.put('/api/user', LoginController.IsAdminOrUser, UserController.update);
    //Uprade or downgrade user to admin and revers
    app.put('/api/user/change/:userId', LoginController.IsAdmin, UserController.change);
    app.delete('/api/user/:userId', LoginController.IsAdmin, UserController.destroyId);
    app.delete('/api/user/', LoginController.IsAdminOrUser, UserController.destroy);

    //Creare categorie doar de admin
    app.post('/api/categories', LoginController.IsAdmin, CategoryController.create);
    app.get('/api/categories', LoginController.IsAdminOrUser, CategoryController.list);
    app.post('/api/categories/search', LoginController.IsAdminOrUser, CategoryController.search);
    app.get('/api/categories/:categoryId', LoginController.IsAdminOrUser, CategoryController.getById);
    app.put('/api/categories', LoginController.IsAdmin, CategoryController.update);
    app.delete('/api/categories', LoginController.IsAdmin, CategoryController.destroy);

    //routes for course controller
    app.post('/api/courses', LoginController.IsAdmin, CourseController.create);
    app.post('/api/courses/image', LoginController.IsAdmin, CourseController.uploadImage);
    app.get('/api/courses', LoginController.IsAdminOrUser, CourseController.list);
    app.post('/api/courses/search', LoginController.IsAdminOrUser, CourseController.search);
    app.get('/api/courses/:courseId', LoginController.IsAdminOrUser, CourseController.getById);
    app.put('/api/courses', LoginController.IsAdmin, CourseController.update);
    app.delete('/api/courses/', LoginController.IsAdmin, CourseController.destroy);

    //routes for chapter controller
    app.post('/api/chapters', LoginController.IsAdmin, ChapterController.create);
    app.get('/api/chapters', LoginController.IsAdminOrUser, ChapterController.list);
    app.get('/api/chapters/:chapterId', LoginController.IsAdminOrUser, ChapterController.getById);
    app.put('/api/chapters', LoginController.IsAdmin, ChapterController.update);
    app.delete('/api/chapters', LoginController.IsAdmin, ChapterController.destroy);

    //routes for quiz controller
    app.post('/api/quiz', LoginController.IsAdmin, QuizController.create);
    app.get('/api/quiz', LoginController.IsAdminOrUser, QuizController.list);
    app.get('/api/quiz/:quizId', LoginController.IsAdminOrUser, QuizController.getById);
    app.put('/api/quiz', LoginController.IsAdmin, QuizController.update);
    app.delete('/api/quiz', LoginController.IsAdmin, QuizController.destroy);

    //routes for quiz options controller
    app.post('/api/quizOptions', LoginController.IsAdmin, QuizOptionsController.create);
    app.get('/api/quizzes/quizOptions', LoginController.IsAdminOrUser, QuizOptionsController.listAll);
    app.get('/api/quizOptions', LoginController.IsAdminOrUser, QuizOptionsController.list);
    app.get('/api/quizOptions/:quizOptionsId', LoginController.IsAdminOrUser, QuizOptionsController.getById);
    app.put('/api/quizOptions', LoginController.IsAdmin, QuizOptionsController.update);
    app.delete('/api/quizOptions', LoginController.IsAdmin, QuizOptionsController.destroy);

    //routes for answer controller
    app.post('/api/answers', LoginController.IsAdminOrUser, AnswerController.create);
    app.get('/api/answers', AnswerController.list); // list all answers
    app.get('/api/answers/:answerId', AnswerController.getById);
    app.delete('/api/answers', AnswerController.destroy);
    app.delete('/api/chapter/answer', LoginController.IsAdminOrUser, AnswerController.deleteforchapter);

    //routes for image controller, add
    /*app.post('/api/user/image', LoginController.IsAdminOrUser, ImageController.create); // insert an user image
    app.post('/api/category/:categoryId/course/:courseId/image', LoginController.IsAdmin, ImageController.create); // insert a course image
    */
    // list all images (users/courses), only for testing
    /*app.get('/api/images', LoginController.IsAdmin, ImageController.list); 
    
    // List all users images, only for testing
    app.get('/api/usr/images', LoginController.IsAdmin, ImageController.userlist);
    app.get('/api/usr/image', LoginController.IsAdminOrUser, ImageController.getUserImage);
    
    // List images for courses, only for testing
    app.get('/api/curs/images', LoginController.IsAdminOrUser, ImageController.curslist);
    app.get('/api/curs/image', LoginController.IsAdminOrUser, ImageController.getCourseImage);

    //Other routes for image
    app.get('/api/image/:imageId', LoginController.IsAdminOrUser, ImageController.getById);
    //app.put('/api/user/:userId/image/:imageId', LoginController.IsAdminOrUser, ImageController.update);//update a user image
    //app.put('/api/category/:categoryId/course/:courseId/image/:imageId', LoginController.IsAdmin, ImageController.update);//update a course image
    app.delete('/api/image/:imageId', LoginController.IsAdmin, ImageController.destroy);
*/
    //Login Route
    app.post('/api/login', LoginController.login);
    app.get('/api/login', LoginController.IsAdminOrUser, UserController.list);
    app.get('/api/logout', LoginController.InitialPage);
    
    //ResetPassword Rout
    app.post('/api/reset', ResetPasswordController.SendToken);
    app.get('/api/reset/:token', ResetPasswordController.VerifyToken, ResetPasswordController.ChangePassword);
    app.post('/api/reset/:token', ResetPasswordController.VerifyToken, ResetPasswordController.NewPassword);

    //Only for testing
    app.get('/api/reset/user/all', LoginController.IsAdmin, UserTokenController.list);
    app.get('/api/reset/:id', LoginController.IsAdmin, UserTokenController.destroy);

    //Score -> GetScore
    app.get('/api/chapter/score', LoginController.IsAdminOrUser, ScoreController.GetScoreChapter);
    app.get('/api/course/score', LoginController.IsAdminOrUser, ScoreController.GetScoreCourse);
    app.get('/api/score', LoginController.IsAdminOrUser, ScoreController.GetUserScore); // get user's score

    app.get('/public/images/:name', ImagesController.getByName);
}