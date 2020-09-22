import express from 'express';
import { PostController } from '../controllers/PostController.mjs';
import { ConnectionController } from '../controllers/ConnectionController.mjs';
import { PageController } from '../controllers/PageController.mjs';
import { UserController } from '../controllers/UserController.mjs';
import { CategoryController } from '../controllers/CategoryController.mjs';
import { AuthController } from '../controllers/AuthController.mjs';
import jwt from 'express-jwt';
import sharedSecret from '../config/secret.mjs';

let router = new express.Router();
let postController = new PostController();
let pageController = new PageController();
let categoryController = new CategoryController();
let userController = new UserController();
let authController = new AuthController();
let connectionController = new ConnectionController();
let algorithms = ['RS256'];

// post methods
router.get('/post', postController.getAll);
router.get('/post/published', postController.getAllPublished);
router.get('/post/category/:name', postController.getAllPublishedByCategory);
router.get('/post/:id', postController.getById);
router.get('/post/:year/:month/:day/:key', postController.getByKeyAndDate);
router.post('/post', jwt({secret: sharedSecret, algorithms}), postController.add);
router.put('/post/:id', jwt({secret: sharedSecret, algorithms}), postController.update);
router.delete('/post/:id', jwt({secret: sharedSecret, algorithms}), postController.delete);

// connection methods
router.get('/connection', connectionController.getAll);
router.get('/connection/:id', connectionController.getById);
router.post('/connection', jwt({secret: sharedSecret, algorithms}), connectionController.add);
router.put('/connection/:id', jwt({secret: sharedSecret, algorithms}), connectionController.update);
router.delete('/connection/:id', jwt({secret: sharedSecret, algorithms}), connectionController.delete);

// category methods
router.get('/category', categoryController.getAll);
router.get('/category/:id', categoryController.getById);
router.post('/category', jwt({secret: sharedSecret, algorithms}), categoryController.add);
router.put('/category/:id', jwt({secret: sharedSecret, algorithms}), categoryController.update);
router.delete('/category/:id', jwt({secret: sharedSecret, algorithms}), categoryController.delete);

// page methods
router.get('/page', pageController.getAll);
router.get('/page/:id', pageController.getById);
router.get('/page/key/:key', pageController.getByKey);
router.post('/page', jwt({secret: sharedSecret, algorithms}), pageController.add);
router.put('/page/:id', jwt({secret: sharedSecret, algorithms}), pageController.update);
router.delete('/page/:id', jwt({secret: sharedSecret, algorithms}), pageController.delete);

// user methods
router.get('/user', jwt({secret: sharedSecret, algorithms}), userController.getAll);
router.get('/user/:id', jwt({secret: sharedSecret, algorithms}), userController.getById);
router.post('/user', jwt({secret: sharedSecret, algorithms}), userController.add);
router.put('/user/:id', jwt({secret: sharedSecret, algorithms}), userController.update);
router.put('/user/:id/password', jwt({secret: sharedSecret, algorithms}), userController.setPassword);
router.delete('/user/:id', jwt({secret: sharedSecret, algorithms}), userController.delete);

// log in
router.post('/authenticate', authController.login);

router.get('/ping', (req, res) => {
  res.json({ response: 'pong'});
});
  
export default router;
