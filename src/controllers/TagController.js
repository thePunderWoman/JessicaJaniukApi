import util from 'util';
import models from '../models/index';

function verifyRequiredParams(request) {
  request.assert('name', 'name field is required').notEmpty();

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

export class TagController {

  getAll(request, response, next) {
    let page = request.params.page || 1;
    models.Tag.findAll({
      order: [
        ['title', 'ASC']
      ],
      limit: 10,
      offset: (page - 1) * 10
    })
      .then((tag) => {
        var data = {
          error: 'false',
          data: tag
        };

        response.json(data);
        next();
      });
  }

  getById(request, response, next) {
    models.Tag.find({
      where: {
        'id': request.params.id
      }
    }).then((tag) => {
      var data = {
        error: 'false',
        data: tag
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
      name: request.body['name'],
    }).then((tag) => {
      var data = {
        error: 'false',
        message: 'New tag created successfully',
        data: tag
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

    models.Tag.find({
      where: {
        'id': request.params.id
      }
    }).then((tag) => {
      if (tag) {
        tag.updateAttributes({
          name: request.body['name'],
        }).then((tag) => {
          var data = {
            error: 'false',
            message: 'Updated tag successfully',
            data: tag
          };

          response.json(data);
          next();
        });
      }
    });
  }

  delete(request, response, next) {
    models.Tag.destroy({
      where: {
        id: request.params['id']
      }
    }).then((tag) => {
      var data = {
        error: 'false',
        message: 'Deleted tag successfully',
        data: tag
      };

      response.json(data);
      next();
    });
  }
}
