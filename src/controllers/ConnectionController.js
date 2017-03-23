import util from 'util';
import models from '../models/index';

export class ConnectionController {
  constructor() {
    this.error_messages = null;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.verifyRequiredParams = this.verifyRequiredParams.bind(this);
  }

  getAll(request, response, next) {
    models.Connection.findAll({
      order: [
        ['name', 'ASC']
      ],
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
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
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
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
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

  verifyRequiredParams(request) {
    request.assert('name', 'First Name is required').notEmpty();
    request.assert('url', 'Last Name is required').notEmpty();
    request.assert('linktext', 'Email address is required').notEmpty();

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
}
