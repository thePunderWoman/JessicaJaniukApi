var Router = require('restify-router').Router;
var postController = require('../controllers/postController');

var routerInstance = new Router();

// post methods
routerInstance.get('/post', postController.getAll);
routerInstance.get('/post/:id', postController.getById);
routerInstance.post('/post',postController.add);
routerInstance.put('/post/:id',postController.update);
routerInstance.del('/post/:id',postController.delete);

// add a route like you would on a restify server instance 
routerInstance.get('/ping', function (req, res, next) {
  res.json('pong');
  next();
});
  
module.exports = {
  routerInstance: routerInstance
};
