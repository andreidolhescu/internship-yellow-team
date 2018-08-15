const cors = require('cors'); // do not remove this

const testController = require('../controllers').testController;
const UserController = require('../controllers').UserController;

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
    app.get('/api/register', UserController.list);
    app.get('/api/register/:userId', UserController.getById);
    app.put('/api/register/:userId', UserController.update);
    app.delete('/api/register/:userId', UserController.destroy);
    // end examples
}