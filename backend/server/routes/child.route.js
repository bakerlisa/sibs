const ChildController = require('../controllers/child.controller');

module.exports = app => {
    app.post('/api/children/', ChildController.allChildern);
    app.post('/api/create/child', ChildController.createChild);
    app.delete('/api/delete/child/:id', ChildController.deleteChild);
}