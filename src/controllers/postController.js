var util = require('util');
var models = require('../models/index');
var error_messages = null;

module.exports = {
  getAll: function(request, response, next) {
    models.Post.findAll({})
      .then(function(posts) {
        var data = {
          error: 'false',
          data: posts
        };

        response.json(data);
        next();
      });
  },

  getById: function(request, response, next) {
    models.Post.find({
      where: {
        'id': request.params.id
      }
    }).then(function(post) {
      var data = {
        error: 'false',
        data: post
      };

      response.json(data);
      next();
    });
  },

  verifyRequiredParams: function(request) {
    request.assert('title', 'title field is required').notEmpty();
    request.assert('published', 'published field is required').notEmpty();
    request.assert('publishDate', 'publish date field must be a date').isDate();

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
  },

  add: function(request, response, next) {
    if (!this.verifyRequiredParams(request)) {
      response.json(422, error_messages);
      return;
    }

    models.Post.create({
      title: request.params['title'],
      content: request.params['content'],
      published: request.params['published'],
      publishDate: request.params['publishDate'],
    }).then(function(post) {
      var data = {
        error: 'false',
        message: 'New post created successfully',
        data: post
      };

      response.json(data);
      next();
    });
  },

  update: function(request, response, next) {
    if (!this.verifyRequiredParams(request)) {
      response.json(422, error_messages);
      return;
    }

    models.Post.find({
      where: {
        'id': request.params.id
      }
    }).then(function(post) {
      if (post) {
        post.updateAttributes({
          title: request.params['title'],
          content: request.params['content'],
          published: request.params['published'],
          publishDate: request.params['publishDate'],
        }).then(function(post) {
          var data = {
            error: 'false',
            message: 'Updated post successfully',
            data: post
          };

          response.json(data);
          next();
        });
      }
    });
  },

  delete: function(request, response, next) {
    models.Post.destroy({
      where: {
        id: request.params['id']
      }
    }).then(function(post) {
      var data = {
        error: 'false',
        message: 'Deleted post successfully',
        data: post
      };

      response.json(data);
      next();
    });
  }

};
