var util = require('util');
var models = require('../models/index');
var passwordHelper = require('../helpers/passwordHelper');
var error_messages = null;

function verifyRequiredParams(request) {
  request.assert('firstName', 'First Name is required').notEmpty();
  request.assert('lastName', 'Last Name is required').notEmpty();
  request.assert('email', 'Email address is required').notEmpty().isEmail();
  request.assert('username', 'username is required').notEmpty();
  request.assert('password', 'password is required').notEmpty();
  request.assert('isAdmin', 'isAdmin is required').isBoolean();

  var errors = request.validationErrors();
  if (errors) {
    error_messages = {
      error: 'true',
      message: util.inspect(errors)
    };

    return false;
  } else {
    return true;
  }
}

module.exports = {
  getAll: function(request, response, next) {
    models.User.findAll({})
      .then(function(users) {
        var data = {
          error: 'false',
          data: users
        };

        response.json(data);
        next();
      });
  },

  getById: function(request, response, next) {
    models.User.find({
      where: {
        'id': request.params.id
      }
    }).then(function(user) {
      var data = {
        error: 'false',
        data: user
      };

      response.json(data);
      next();
    });
  },

  add: function(request, response, next) {
    if (!verifyRequiredParams(request)) {
      response.json(422, error_messages);
      return;
    }

    models.User.create({
      firstName: request.params['firstName'],
      lastName: request.params['lastName'],
      email: request.params['email'],
      username: request.params['username'],
      password: passwordHelper.cryptPassword(request.params['password']),
      isAdmin: request.params['isAdmin'],
    }).then(function(user) {
      var data = {
        error: 'false',
        message: 'New user created successfully',
        data: user
      };

      response.json(data);
      next();
    });
  },

  update: function(request, response, next) {
    if (!verifyRequiredParams(request)) {
      response.json(422, error_messages);
      return;
    }

    models.User.find({
      where: {
        'id': request.params.id
      }
    }).then(function(user) {
      if (user) {
        user.updateAttributes({
          firstName: request.params['firstName'],
          lastName: request.params['lastName'],
          email: request.params['email'],
          username: request.params['username'],
          password: passwordHelper.cryptPassword(request.params['password']),
          isAdmin: request.params['isAdmin'],
        }).then(function(user) {
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
  },

  delete: function(request, response, next) {
    models.User.destroy({
      where: {
        id: request.params['id']
      }
    }).then(function(user) {
      var data = {
        error: 'false',
        message: 'Deleted user successfully',
        data: user
      };

      response.json(data);
      next();
    });
  }

};
