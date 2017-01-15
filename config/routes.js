var API = require('../app/controllers');

module.exports = function (server) {

	// INDEX AND PING ROUTES
	server.get('/status', API.ping.get);
	server.get('/', API.ping.get);

	// generic fall through routes
	server.get( '/:model', API.Generic.getAll);
	server.get( '/:model/:id', API.Generic.get);
	server.post('/:model', API.Generic.post);
	server.put( '/:model/:id', API.Generic.put);
	server.del( '/:model/:id', API.Generic.del);
};
