import util from 'util';
import models from '../models/index';

export class PostController {
  constructor() {
    this.error_messages = null;
  }

  verifyRequiredParams(request) {
    request.assert('title', 'title field is required').notEmpty();
    request.assert('published', 'published field is required').notEmpty();
    request.assert('publishDate', 'publish date field must be a date').isDate();

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
    let page = request.params.page || 1;
    models.Post.findAll({
      order: 'publishDate DESC',
      limit: 10,
      offset: (page - 1) * 10
    })
      .then((posts) => {
        var data = {
          error: 'false',
          data: posts
        };

        response.json(data);
        next();
      });
  }

  getAllPublished(request, response, next) {
    let page = request.params.page || 1;
    models.Post.findAll({
      where: {
        'published': true,
        'publishDate': {
          $lte: new Date() 
        }
      },
      order: 'publishDate DESC',
      limit: 10,
      offset: (page - 1) * 10
    })
      .then((posts) => {
        var data = {
          error: 'false',
          data: posts
        };

        response.json(data);
        next();
      });
  }

  getById(request, response, next) {
    models.Post.find({
      where: {
        'id': request.params.id
      }
    }).then((post) => {
      var data = {
        error: 'false',
        data: post
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

    models.Post.create({
      title: request.params['title'],
      content: request.params['content'],
      published: request.params['published'],
      publishDate: request.params['publishDate'],
    }).then((post) => {
      var data = {
        error: 'false',
        message: 'New post created successfully',
        data: post
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

    models.Post.find({
      where: {
        'id': request.params.id
      }
    }).then((post) => {
      if (post) {
        post.updateAttributes({
          title: request.params['title'],
          content: request.params['content'],
          published: request.params['published'],
          publishDate: request.params['publishDate'],
        }).then((post) => {
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
  }

  delete(request, response, next) {
    models.Post.destroy({
      where: {
        id: request.params['id']
      }
    }).then((post) => {
      var data = {
        error: 'false',
        message: 'Deleted post successfully',
        data: post
      };

      response.json(data);
      next();
    });
  }
}
