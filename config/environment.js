var path        = require('path')
    , settings  = require('./settings')
    , models    = require('../app/models/');

module.exports = function (server) {
    server.use(Restify.CORS());
    server.use(Restify.acceptParser(server.acceptable));
    server.use(Restify.dateParser());
    server.use(Restify.queryParser());
    server.use(Restify.gzipResponse());
    server.use(Restify.bodyParser());
    //server.use(Restify.authorizationParser());
    //server.use(Restify.jsonp());

    server.use(function (req, res, next) {
      models(function (err, db) {
        if (err) {
            if (err.message.indexOf('ECONNREFUSED') > 0) {
                throw new Error("Could not connect to database: " + settings.database.host);
            }
            else {
              console.log(err);
                return next(err);
            }
        }
        else {
            req.models = db.models;
            req.db     = db;

            return next();
        }
      });
    });
};