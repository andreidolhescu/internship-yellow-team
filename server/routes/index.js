const cors = require('cors'); // do not remove this

const testController = require('../controllers').testController;
const UserController = require('../controllers').UserController;
const CategoryController = require('../controllers').CategoryController;
const ImageController = require('../controllers').ImageController;


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

    app.post('/api/category', CategoryController.create);
    app.get('/api/category', CategoryController.list);
    app.get('/api/category/:id', CategoryController.getById);
    app.put('/api/category/:id', CategoryController.update);
    app.delete('/api/category/:id', CategoryController.destroy);

    // end examples


    //============= image section ===========


    app.post('/api/image', ImageController.create);
    app.get('/api/image', ImageController.list);
    app.get('/api/image/:id', ImageController.getById);
    app.put('/api/image/:id', ImageController.update);
    app.delete('/api/image/:id', ImageController.destroy);

    //========================================
    
}