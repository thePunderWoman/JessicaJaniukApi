import util from 'util';
import {Tag} from '../models/tag.mjs';

export class TagController {
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
    let page = request.params.page || 1;
    Tag.findAll({
      order: [
        ['name', 'ASC']
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
    Tag.findOne({
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
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
      return;
    }

    Tag.create({
      name: request.body['name'].toLowerCase(),
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
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
      return;
    }

    Tag.findOne({
      where: {
        'id': request.params.id
      }
    }).then((tag) => {
      if (tag) {
        tag.update({
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
    Tag.destroy({
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

  verifyRequiredParams(request) {
    request.assert('name', 'name field is required').notEmpty();

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
