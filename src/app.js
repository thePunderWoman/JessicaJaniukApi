var restify = require('restify');
var restifyValidator = require('restify-validator');
var routes = require('./config/routes');

var server = restify.createServer({
  name: 'JessicaJaniuk v1'
});

server.pre(restify.CORS({
  origins: ['https://jessicajaniuk.com', 'http://localhost:4200'],   // defaults to ['*']
}));
server.use(restify.authorizationParser());
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restifyValidator);
server.use(restify.fullResponse());

routes.routerInstance.applyRoutes(server);

server.listen(process.env.PORT || 3000, function() {
  console.log('REST API Server listening at http://localhost:3000');
});
