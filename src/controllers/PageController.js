import util from 'util';
import models from '../models/index';

function verifyRequiredParams(request) {
  request.assert('title', 'title field is required').notEmpty();
  request.assert('key', 'key field is required').notEmpty();

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

export class PageController {

  getAll(request, response, next) {
    let page = request.params.page || 1;
    models.Page.findAll({
      order: [
        ['title', 'ASC']
      ],
      limit: 10,
      offset: (page - 1) * 10
    })
      .then((pages) => {
        var data = {
          error: 'false',
          data: pages
        };

        response.json(data);
        next();
      });
  }

  getById(request, response, next) {
    models.Page.find({
      where: {
        'id': request.params.id
      }
    }).then((page) => {
      var data = {
        error: 'false',
        data: page
      };

      response.json(data);
      next();
    });
  }

  getByKey(request, response, next) {
    models.Page.find({
      where: {
        'key': request.params.key
      }
    }).then((page) => {
      var data = {
        error: 'false',
        data: page
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

    models.Page.create({
      title: request.body['title'],
      content: request.body['content'],
      key: request.body['key'],
    }).then((page) => {
      var data = {
        error: 'false',
        message: 'New page created successfully',
        data: page
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

    models.Page.find({
      where: {
        'id': request.params.id
      }
    }).then((page) => {
      if (page) {
        page.updateAttributes({
          title: request.body['title'],
          content: request.body['content'],
          key: request.body['key'],
        }).then((page) => {
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
  }

  delete(request, response, next) {
    models.Page.destroy({
      where: {
        id: request.params['id']
      }
    }).then((page) => {
      var data = {
        error: 'false',
        message: 'Deleted page successfully',
        data: page
      };

      response.json(data);
      next();
    });
  }
}
