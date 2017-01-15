var restify = require('restify');
var restifyValidator = require('restify-validator');
var routes = require('./config/routes');

var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restifyValidator);

routes.routerInstance.applyRoutes(server);

server.listen(3000, function() {
  console.log('REST API Server listening at http://localhost:3000');
});
