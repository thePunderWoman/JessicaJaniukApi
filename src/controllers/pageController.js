var util = require('util');
var models = require('../models/index');
var error_messages = null;

function verifyRequiredParams(request) {
  request.assert('title', 'title field is required').notEmpty();

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
    models.Page.findAll({})
      .then(function(pages) {
        var data = {
          error: 'false',
          data: pages
        };

        response.json(data);
        next();
      });
  },

  getById: function(request, response, next) {
    models.Page.find({
      where: {
        'id': request.params.id
      }
    }).then(function(page) {
      var data = {
        error: 'false',
        data: page
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

    models.Page.create({
      title: request.params['title'],
      content: request.params['content'],
    }).then(function(page) {
      var data = {
        error: 'false',
        message: 'New page created successfully',
        data: page
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

    models.Page.find({
      where: {
        'id': request.params.id
      }
    }).then(function(page) {
      if (page) {
        page.updateAttributes({
          title: request.params['title'],
          content: request.params['content'],
        }).then(function(page) {
          var data = {
            error: 'false',
            message: 'Updated page successfully',
            data: page
          };

          response.json(data);
          next();
        });
      }
    });
  },

  delete: function(request, response, next) {
    models.Page.destroy({
      where: {
        id: request.params['id']
      }
    }).then(function(page) {
      var data = {
        error: 'false',
        message: 'Deleted page successfully',
        data: page
      };

      response.json(data);
      next();
    });
  }
};
