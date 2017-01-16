var models = require('../models/index');
var passwordHelper = require('../helpers/passwordHelper');
var jwt = require('jsonwebtoken');
var sharedSecret = require('../config/secret').secret;

module.exports = {
  login: function(request, response, next) {
    models.User.find({
      where: {
        'username': request.params.username
      }
    }).then(function(user) {
      var data = {
        error: true,
        message: 'Authentication failed',
      };
      if (user && passwordHelper.comparePassword(request.params.password, user.password)) {
        var userResponse = { 
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin
        };
        var token = jwt.sign(userResponse, sharedSecret, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)});
        data = {
          error: false,
          message: 'Authentication Successful',
          token: token,
          user: userResponse
        };
      }
      response.json(200, data);
      next();
    });
  }
};
