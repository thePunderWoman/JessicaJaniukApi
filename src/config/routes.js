var Router = require('restify-router').Router;
var jwt = require('restify-jwt');
var postController = require('../controllers/postController');
var pageController = require('../controllers/pageController');
var sharedSecret = require('../config/secret').secret;

var routerInstance = new Router();

// post methods
routerInstance.get('/post', postController.getAll);
routerInstance.get('/post/:id', postController.getById);
routerInstance.post('/post', jwt({secret: sharedSecret}),postController.add);
routerInstance.put('/post/:id', jwt({secret: sharedSecret}),postController.update);
routerInstance.del('/post/:id', jwt({secret: sharedSecret}),postController.delete);

// page methods
routerInstance.get('/page', pageController.getAll);
routerInstance.get('/page/:id', pageController.getById);
routerInstance.post('/page', jwt({secret: sharedSecret}), pageController.add);
routerInstance.put('/page/:id', jwt({secret: sharedSecret}), pageController.update);
routerInstance.del('/page/:id', jwt({secret: sharedSecret}) ,pageController.delete);

// add a route like you would on a restify server instance 
routerInstance.get('/ping', function (req, res, next) {
  res.json('pong');
  next();
});
  
module.exports = {
  routerInstance: routerInstance
};
