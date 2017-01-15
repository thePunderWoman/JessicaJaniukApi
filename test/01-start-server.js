restify = require('restify');
assert = require('assert');
 
before(function(done) {
	console.log('starting API...');
	require('../app/core/start_server').StartServer('DEV');
	done();
});