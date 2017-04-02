import util from 'util';
import models from '../models/index';

export class PostController {
  constructor() {
    this.error_messages = null;
    this.getAll = this.getAll.bind(this);
    this.getAllPublished = this.getAllPublished.bind(this);
    this.getById = this.getById.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.verifyRequiredParams = this.verifyRequiredParams.bind(this);
    this.addTagsToPost = this.addTagsToPost.bind(this);
  }

  getAll(request, response, next) {
    let page = request.query.page || 1;
    models.Post.findAndCountAll({
      include: [models.Category, models.Tag],
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

  getAllPublished(request, response) {
    let page = request.query.page || 1;
    models.Post.findAndCountAll({
      include: [models.Category, models.Tag],
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
          data: {
            posts: posts.rows,
            page: page,
            count: posts.count
          }
        };

        response.json(data);
      });
  }

  getAllPublishedByCategory(request, response) {
    let page = request.query.page || 1;
    models.Post.findAndCountAll({
      where: {
        'published': true,
        'publishDate': {
          $lte: new Date() 
        },
      },
      include: [
        {
          model: models.Category,
          where: {
            'name': { $iLike: request.params.name }
          }
        },
        models.Tag
      ],
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
      });
  }

  getById(request, response, next) {
    models.Post.find({
      include: [models.Category, models.Tag],
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

  getByKeyAndDate(request, response, next) {
    let date = new Date(request.params.year, request.params.month - 1, request.params.day);
    let maxDate = new Date(request.params.year, request.params.month - 1, request.params.day);
    maxDate.setDate(date.getDate() + 1);
    models.Post.find({
      include: [models.Category, models.Tag],
      where: {
        'key': request.params.key,
        'publishDate': {
          $gte: date,
          $lt: maxDate
        }
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
      title: request.body['title'],
      key: this.createKey(request.body['title']),
      content: request.body['content'],
      published: request.body['published'],
      publishDate: request.body['publishDate'],
      categoryId: request.body['categoryId'],
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
          title: request.body['title'],
          key: this.createKey(request.body['title']),
          content: request.body['content'],
          published: request.body['published'],
          publishDate: request.body['publishDate'],
          categoryId: request.body['categoryId'],
        })
        .then((post) => {
          this.addTagsToPost(request.body['tags'], post.id);
        })
        .finally((post) => {
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

  verifyRequiredParams(request) {
    request.assert('title', 'title field is required').notEmpty();
    request.assert('published', 'published field is required').notEmpty();
    request.assert('publishDate', 'publish date field must be a date').isDate();
    request.assert('categoryId', 'category is required').notEmpty();

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

  addTagsToPost(tagNames, postId) {
    tagNames.forEach(tag => tag.toLowerCase);
    models.PostTag.destroy({ where: { PostId: postId } })
      .then(() => {
        return models.Tag.findAll({
          where: {
            'name': {'$in': tagNames}
          }
        });
      }).then((tags) => {
        let newTagName = tagNames.filter((name) => {
          return tags.findIndex((tag) => { return name === tag.name; }) === -1;
        });

        let newTags = newTagName.map((tag) => {
          return { name: tag };
        });

        return models.Tag.bulkCreate(newTags);
      }).then(() => {
        return models.Tag.findAll({
          where: {
            'name': {'$in': tagNames}
          }
        });
      }).then((tags) => {
        let postTags = tags.map((tag) => {
          return { TagId: tag.id, PostId: postId };
        });
        return models.PostTag.bulkCreate(postTags);
      });
  }

  createKey(title) {
    title = title.trim().toLowerCase();
    title = title.replace(/((?!([a-z0-9])).)/gi, '-').replace(/[-]+/g,'-');
    if (title.slice(title.length - 1, title.length) === '-') {
      title = title.slice(0, -1);
    }
    if (title.length > 100) {
      title.slice(0, 100);
    }
    return title;
  }
}
