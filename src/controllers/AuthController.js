import {User} from '../models/user.js';
import PasswordHelper from '../helpers/PasswordHelper.js';
import jwt from 'jsonwebtoken';
import sharedSecret from '../config/secret.js';

export class AuthController {
  constructor() {
    this.login = this.login.bind(this);
  }
  
  login(request, response, next) {
    User.find({
      where: {
        'username': request.body.username
      }
    }).then((user) => {
      var data = {
        error: true,
        message: 'Authentication failed',
      };
      if (user && PasswordHelper.comparePassword(request.body.password, user.password)) {
        var userResponse = { 
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin
        };
        var token = jwt.sign(userResponse, sharedSecret, { expiresIn: '1d' });
        var expires = new Date();
        expires.setDate(expires.getDate() + 1);
        data = {
          error: false,
          message: 'Authentication Successful',
          token: token,
          expires: expires
        };
      }
      response.status(200).json(data);
      next();
    });
  }
}
