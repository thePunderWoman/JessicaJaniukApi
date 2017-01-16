import express from 'express';
import { PostController } from '../controllers/PostController';
import { PageController } from '../controllers/PageController';
import { UserController } from '../controllers/UserController';
import { AuthController } from '../controllers/AuthController';
import auth from 'express-jwt-token';

let router = new express.Router();
let postController = new PostController();
let pageController = new PageController();
let userController = new UserController();
let authController = new AuthController();

// post methods
router.get('/post', postController.getAll);
router.get('/post/:id', postController.getById);
router.post('/post', auth.jwtAuthProtected, postController.add);
router.put('/post/:id', auth.jwtAuthProtected, postController.update);
router.delete('/post/:id', auth.jwtAuthProtected, postController.delete);

// // page methods
router.get('/page', pageController.getAll);
router.get('/page/:id', pageController.getById);
router.post('/page', auth.jwtAuthProtected, pageController.add);
router.put('/page/:id', auth.jwtAuthProtected, pageController.update);
router.delete('/page/:id', auth.jwtAuthProtected, pageController.delete);

// // user methods
router.get('/user', auth.jwtAuthProtected, userController.getAll);
router.get('/user/:id', auth.jwtAuthProtected, userController.getById);
router.post('/user', auth.jwtAuthProtected, userController.add);
router.put('/user/:id', auth.jwtAuthProtected, userController.update);
router.delete('/user/:id', auth.jwtAuthProtected, userController.delete);

// log in
router.post('/authenticate', authController.login);

router.get('/ping', (req, res) => {
  res.json({ response: 'pong'});
});
  
export default router;
