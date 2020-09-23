import util from 'util';
import {Page} from '../models/page.mjs';
import {Meta} from '../models/meta.mjs';

export class PageController {
  constructor() {
    this.error_messages = null;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByKey = this.getByKey.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.verifyRequiredParams = this.verifyRequiredParams.bind(this);
    this.addMetaToPage = this.addMetaToPage.bind(this);
  }

  getAll(request, response, next) {
    let page = request.params.page || 1;
    Page.findAll({
      include: [Meta],
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
    Page.findOne({
      include: [Meta],
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
    Page.findOne({
      include: [Meta],
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
    if (!this.verifyRequiredParams(request)) {
      response.json(422, this.error_messages);
      return;
    }

    Page.create({
      title: request.body['title'],
      content: request.body['content'],
      key: request.body['key'],
    }).then((page) => {
      this.addMetaToPage(request.body['meta'], page.id);
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

    Page.findOne({
      where: {
        'id': request.params.id
      }
    }).then((page) => {
      if (page) {
        page.updateAttributes({
          title: request.body['title'],
          content: request.body['content'],
          key: request.body['key'],
        }).then(() => {
          return this.addMetaToPage(request.body['meta'], page.id);
        }).then(() => {
          return Page.findOne({
            where: {
              'id': request.params.id
            }
          });
        }).then((updatedPage) => {
          var data = {
            error: 'false',
            message: 'Updated page successfully',
            data: updatedPage
          };

          response.json(data);
          next();
        });
      }
    });
  }

  delete(request, response, next) {
    Page.destroy({
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

  addMetaToPage(metatags, pageId) {
    Meta.destroy({ where: { pageId: pageId } })
      .then(() => {
        let newTags = metatags.map((tag) => {
          return { pageId: pageId, tag: tag.tag, value: tag.value };
        });
        return Meta.bulkCreate(newTags);
      });
  }

  verifyRequiredParams(request) {
    request.assert('title', 'title field is required').notEmpty();
    request.assert('key', 'key field is required').notEmpty();

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
