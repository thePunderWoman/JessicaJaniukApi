var Router = require('restify-router').Router;
var postController = require('../controllers/postController');
var pageController = require('../controllers/pageController');

var routerInstance = new Router();

// post methods
routerInstance.get('/post', postController.getAll);
routerInstance.get('/post/:id', postController.getById);
routerInstance.post('/post',postController.add);
routerInstance.put('/post/:id',postController.update);
routerInstance.del('/post/:id',postController.delete);

// page methods
routerInstance.get('/page', pageController.getAll);
routerInstance.get('/page/:id', pageController.getById);
routerInstance.post('/page',pageController.add);
routerInstance.put('/page/:id',pageController.update);
routerInstance.del('/page/:id',pageController.delete);

// add a route like you would on a restify server instance 
routerInstance.get('/ping', function (req, res, next) {
  res.json('pong');
  next();
});
  
module.exports = {
  routerInstance: routerInstance
};
