var assert = require('assert');
var moment = require('moment');
var client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:3000'
});
var testData = {};

describe('generic routes', function() {
    describe('post', function () {
        it('should post a Post', function(done) {
            var model = {
                title: "Test Post",
                post_date: moment().format(),
                is_deleted: false
            };

            client.post('/post', model, function(err, req, res, data) {
                assert(!err, 'error: ' + JSON.stringify(err));
                testData.post = data;
                //assert.equal()
                done();
            });

        });
    });
});