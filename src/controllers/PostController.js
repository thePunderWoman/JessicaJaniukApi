import util from 'util';
import models from '../models/index';
import sequelize from 'sequelize';

function verifyRequiredParams(request) {
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
}
let error_messages = null;

export class PostController {

  getAll(request, response, next) {
    let page = request.query.page || 1;
    models.Post.findAndCountAll({
      order: [
        ['publishDate', 'DESC']
      ],
      limit: 10,
      offset: (page - 1) * 10
    })
      .then((posts) => {
        var data = {
          error: 'false',
          data: {
            posts: posts.rows,
            page: page,
            count: posts.count
          }
        };

        response.json(data);
        next();
      });
  }

  getAllPublished(request, response, next) {
    let page = request.query.page || 1;
    models.Post.findAll({
      where: {
        'published': true,
        'publishDate': {
          $lte: new Date() 
        }
      },
      order: [
        ['publishDate', 'DESC']
      ],
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
    if (!verifyRequiredParams(request)) {
      response.json(422, error_messages);
      return;
    }

    models.Post.create({
      title: request.body['title'],
      content: request.body['content'],
      published: request.body['published'],
      publishDate: request.body['publishDate'],
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
    if (!verifyRequiredParams(request)) {
      response.json(422, error_messages);
      return;
    }

    models.Post.find({
      where: {
        'id': request.params.id
      }
    }).then((post) => {
      if (post) {
        post.updateAttributes({
          title: request.body['title'],
          content: request.body['content'],
          published: request.body['published'],
          publishDate: request.body['publishDate'],
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
