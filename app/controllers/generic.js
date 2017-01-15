var settings    = require('../../config/settings')
  , utils       = require('../core/utils')
  , handlers    = require('../core/handlers')
  , singularize = require('../../config/singularize')
  , make_filter = require('../core/filters')
  , helpers     = require('../core/controllerHelpers');


var getModelName = function (req, next) {
  var name = req.params.model
  if (req.models[name]) {
    return name;
  } 
  else if (req.models[singularize[name]]) {
    return singularize[name];
  } 
  else {
    return next(new Restify.ResourceNotFoundError("No model defined for " + name));
  }
}


/* ==================================================================
 * gets all for given model
 */
exports.getAll = function (req, res, next) {

  var parsedQuery = helpers.parseQuery(req);
  var filter = make_filter(parsedQuery.query);
  
  req.models[getModelName(req, next)]
    .find(filter, parsedQuery.sort)
    .limit(parsedQuery.limit)
    .offset(parsedQuery.skip)
    .run(function (err, data) {
      handlers.getHandler(req, res, next, err, data);
    });
}


/* ==================================================================
 * get a specific instance of a given model
 */
exports.get = function (req, res, next) {
  req.models[getModelName(req, next)].get(req.params.id, function (err, data) {
    handlers.getHandler(req, res, next, err, data);
  });
}


/* ==================================================================
 * performs in-place update for a given model
 */
exports.put = function (req, res, next) {
  req.models[getModelName(req, next)].get(req.params.id, function (err, data) {
    handlers.putHandler(req, res, next, err, data);
  });
}


/* ==================================================================
 * creates a new instance of a given model
 */
exports.post = function (req, res, next) {
  var model = utils.createNewModel(req.models[getModelName(req, next)], req.params);
  req.models[getModelName(req, next)].create(model, function (err, data) {
    handlers.createHandler(req, res, next, err, data);
  });
}


/* ==================================================================
 * deletes an instance of a given model
 */
exports.del = function (req, res, next) {
  req.models[getModelName(req, next)].get(req.params.id, function (err, data) {
    handlers.delHandler(req, res, next, err, data);
  });
}
