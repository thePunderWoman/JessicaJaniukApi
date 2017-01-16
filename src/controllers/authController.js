var models = require('../models/index');
var passwordHelper = require('../helpers/passwordHelper');
var jwt = require('restify-jwt');
var sharedSecret = require('../config/secret').secret;

module.exports = {
  login: function(request, response, next) {
    models.User.find({
      where: {
        'username': request.params.username
      }
    }).then(function(user) {
      var data;
      if (passwordHelper.comparePassword(user.password, request.params.password)) {
        data = {
          error: true,
          message: 'Authentication failed',
          data: {}
        };
      } else {
        var token = jwt.sign(user, sharedSecret, { expiresInMinutes: 60 * 5});
        data = {
          error: false,
          message: 'Authentication Successful',
          data: { token: token }
        };
      }

      response.json(data);
      next();
    });
  }
};
