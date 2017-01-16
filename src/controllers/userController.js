import util from 'util';
import models from '../models/index';
import passwordHelper from '../helpers/passwordHelper';

export class UserController {
  constructor() {
    this.error_messages = null;
  }

  verifyRequiredParams(request) {
    request.assert('firstName', 'First Name is required').notEmpty();
    request.assert('lastName', 'Last Name is required').notEmpty();
    request.assert('email', 'Email address is required').notEmpty().isEmail();
    request.assert('username', 'username is required').notEmpty();
    request.assert('password', 'password is required').notEmpty();
    request.assert('isAdmin', 'isAdmin is required').isBoolean();

    var errors = request.validationErrors();
    if (errors) {
      this.error_messages = {
        error: 'true',
        message: util.inspect(errors)
      };

      return false;
    } else {
      return true;
    }
  }

  getAll(request, response, next) {
    models.User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin']
    })
      .then((users) => {
        var data = {
          error: 'false',
          data: users
        };

        response.json(data);
        next();
      });
  }

  getById(request, response, next) {
    models.User.find({
      where: {
        attributes: ['id', 'firstName', 'lastName', 'email', 'isAdmin'],
        'id': request.params.id
      }
    }).then((user) => {
      var data = {
        error: 'false',
        data: user
      };

      response.json(data);
      next();
    });
  }

  add(request, response, next) {
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
      return;
    }

    models.User.create({
      firstName: request.params['firstName'],
      lastName: request.params['lastName'],
      email: request.params['email'],
      username: request.params['username'],
      password: passwordHelper.cryptPassword(request.params['password']),
      isAdmin: request.params['isAdmin'],
    }).then((user) => {
      var data = {
        error: 'false',
        message: 'New user created successfully',
        data: user
      };

      response.json(data);
      next();
    });
  }

  update(request, response, next) {
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
      return;
    }

    models.User.find({
      where: {
        'id': request.params.id
      }
    }).then((user) => {
      if (user) {
        user.updateAttributes({
          firstName: request.params['firstName'],
          lastName: request.params['lastName'],
          email: request.params['email'],
          username: request.params['username'],
          password: passwordHelper.cryptPassword(request.params['password']),
          isAdmin: request.params['isAdmin'],
        }).then((user) => {
          var data = {
            error: 'false',
            message: 'Updated user successfully',
            data: user
          };

          response.json(data);
          next();
        });
      }
    });
  }

  delete(request, response, next) {
    models.User.destroy({
      where: {
        id: request.params['id']
      }
    }).then((user) => {
      var data = {
        error: 'false',
        message: 'Deleted user successfully',
        data: user
      };

      response.json(data);
      next();
    });
  }
}
