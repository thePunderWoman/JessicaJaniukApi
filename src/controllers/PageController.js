import util from 'util';
import models from '../models/index';

export class PageController {
  constructor() {
    this.error_messages = null;
  }

  verifyRequiredParams(request) {
    request.assert('title', 'title field is required').notEmpty();

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
    models.Page.findAll({})
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

  add(request, response, next) {
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
      return;
    }

    models.Page.create({
      title: request.params['title'],
      content: request.params['content'],
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
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
      return;
    }

    models.Page.find({
      where: {
        'id': request.params.id
      }
    }).then((page) => {
      if (page) {
        page.updateAttributes({
          title: request.params['title'],
          content: request.params['content'],
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
