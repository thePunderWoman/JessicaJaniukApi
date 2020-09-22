import express from 'express';
import { PostController } from '../controllers/PostController';
import { ConnectionController } from '../controllers/ConnectionController';
import { PageController } from '../controllers/PageController';
import { UserController } from '../controllers/UserController';
import { CategoryController } from '../controllers/CategoryController';
import { AuthController } from '../controllers/AuthController';
import jwt from 'express-jwt';
import sharedSecret from '../config/secret';

let router = new express.Router();
let postController = new PostController();
let pageController = new PageController();
let categoryController = new CategoryController();
let userController = new UserController();
let authController = new AuthController();
let connectionController = new ConnectionController();

// post methods
router.get('/post', postController.getAll);
router.get('/post/published', postController.getAllPublished);
router.get('/post/category/:name', postController.getAllPublishedByCategory);
router.get('/post/:id', postController.getById);
router.get('/post/:year/:month/:day/:key', postController.getByKeyAndDate);
router.post('/post', jwt({secret: sharedSecret}), postController.add);
router.put('/post/:id', jwt({secret: sharedSecret}), postController.update);
router.delete('/post/:id', jwt({secret: sharedSecret}), postController.delete);

// connection methods
router.get('/connection', connectionController.getAll);
router.get('/connection/:id', connectionController.getById);
router.post('/connection', jwt({secret: sharedSecret}), connectionController.add);
router.put('/connection/:id', jwt({secret: sharedSecret}), connectionController.update);
router.delete('/connection/:id', jwt({secret: sharedSecret}), connectionController.delete);

// category methods
router.get('/category', categoryController.getAll);
router.get('/category/:id', categoryController.getById);
router.post('/category', jwt({secret: sharedSecret}), categoryController.add);
router.put('/category/:id', jwt({secret: sharedSecret}), categoryController.update);
router.delete('/category/:id', jwt({secret: sharedSecret}), categoryController.delete);

// page methods
router.get('/page', pageController.getAll);
router.get('/page/:id', pageController.getById);
router.get('/page/key/:key', pageController.getByKey);
router.post('/page', jwt({secret: sharedSecret}), pageController.add);
router.put('/page/:id', jwt({secret: sharedSecret}), pageController.update);
router.delete('/page/:id', jwt({secret: sharedSecret}), pageController.delete);

// user methods
router.get('/user', jwt({secret: sharedSecret}), userController.getAll);
router.get('/user/:id', jwt({secret: sharedSecret}), userController.getById);
router.post('/user', jwt({secret: sharedSecret}), userController.add);
router.put('/user/:id', jwt({secret: sharedSecret}), userController.update);
router.put('/user/:id/password', jwt({secret: sharedSecret}), userController.setPassword);
router.delete('/user/:id', jwt({secret: sharedSecret}), userController.delete);

// log in
router.post('/authenticate', authController.login);

router.get('/ping', (req, res) => {
  res.json({ response: 'pong'});
});
  
export default router;
