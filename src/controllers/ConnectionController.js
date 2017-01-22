import util from 'util';
import models from '../models/index';

function verifyRequiredParams(request) {
  request.assert('name', 'First Name is required').notEmpty();
  request.assert('url', 'Last Name is required').notEmpty();
  request.assert('linktext', 'Email address is required').notEmpty();

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

export class ConnectionController {
  constructor() {}

  getAll(request, response, next) {
    models.Connection.findAll({
      order: 'name ASC',
    })
      .then((connections) => {
        var data = {
          error: 'false',
          data: connections
        };

        response.json(data);
        next();
      });
  }

  getById(request, response, next) {
    models.Connection.find({
      attributes: ['id', 'name', 'url', 'linktext', 'icon'],
      where: {
        'id': request.params.id
      }
    }).then((connection) => {
      var data = {
        error: 'false',
        data: connection
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

    models.Connection.create({
      name: request.body['name'],
      url: request.body['url'],
      linktext: request.body['linktext'],
      icon: request.body['icon'],
    }).then((connection) => {
      var data = {
        error: 'false',
        message: 'New connection created successfully',
        data: connection
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

    models.Connection.find({
      where: {
        'id': request.params.id
      }
    }).then((connection) => {
      if (connection) {
        connection.updateAttributes({
          name: request.body['name'],
          url: request.body['url'],
          linktext: request.body['linktext'],
          icon: request.body['icon'],
        }).then((connection) => {
          var data = {
            error: 'false',
            message: 'Updated connection successfully',
            data: connection
          };

          response.json(data);
          next();
        });
      }
    });
  }

  delete(request, response, next) {
    models.Connection.destroy({
      where: {
        id: request.params['id']
      }
    }).then((connection) => {
      var data = {
        error: 'false',
        message: 'Deleted connection successfully',
        data: connection
      };

      response.json(data);
      next();
    });
  }
}
