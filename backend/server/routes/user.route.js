const UsersController = require('../controllers/user.controller');
const passport = require('passport');

module.exports = app => {
    app.get('/api/users', UsersController.allUsers);
    app.get('/api/user/:id', UsersController.singleUser);
    app.post('/api/login', passport.authenticate('local',{session:false}), UsersController.loginUser);
    app.post('/api/email', UsersController.EmailUser);
    app.post('/api/create/user', UsersController.createUser);
    app.delete('/api/delete/user/:id', UsersController.deleteUser);
    app.patch('/api/update/user/:id', UsersController.editUser)
    app.patch('/api/update/user/children/:id', UsersController.AddChildUser)
}