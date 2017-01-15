var assert = require('assert'),
	utils  = require('../app/core/utils');

var originalDate = new Date(2014, 5, 12, 9, 17, 55);
var newNotes = "my new notes";
var req = {};
req.params = { "id": 2, "is_deleted": true, "fk_id": 223, "date_created": new Date(), "my_notes": newNotes, "my_name": "First Last"};

describe('utils', function() {
    describe('mergeProperties', function () {
        it('should merge all properties except "id" if no forbiddenProps is passed', function(done) {
			var object = { "id": 1, "is_deleted": false, "fk_id": 123, "date_created": originalDate, "my_notes": null, "my_name": "First Last"};
        	var err = null;
        	try {
	        	utils.mergeProperties(object, req.params);
        	}
        	catch(ex) {
        		err = ex;
        	}
            assert(!err, "No error in mergeProperties.");
            assert.equal(object.id, 1, "object id should not be updated");
            assert.equal(object.is_deleted, true, "object.is_deleted should be updated to true. Actual value: " + object.is_deleted);
            assert.notEqual(object.date_created, originalDate, "object.date_created should be updated. Actual value: " + object.date_created);
            assert.equal(object.my_notes, newNotes, "object.my_notes should be updated. Actual value: " + object.my_notes);
            done();
        });

        it('should merge all properties except "id" and "date_created" when forbiddenProps is passed including "date_created"', function(done) {
			var object = { "id": 1, "is_deleted": false, "fk_id": 123, "date_created": originalDate, "my_notes": null, "my_name": "First Last"};
        	var err = null;
        	try {
	        	utils.mergeProperties(object, req.params, ["date_created"]);
        	}
        	catch(ex) {
        		err = ex;
        	}
            assert(!err, "No error in mergeProperties.");
            assert.equal(object.id, 1, "object id should not be updated");
            assert.equal(object.date_created, originalDate, "object.date_created should NOT be updated. Actual value: " + object.date_created);
            done();
        });

        it('should handle booleans expressed various ways', function(done) {
			var object = { "boolean_type1": false, "boolean_type2": false, "boolean_type3": true, "boolean_type4": true, "boolean_type5": false, "boolean_type6": true};
			req.params = { "boolean_type1": 1, "boolean_type2": "True", "boolean_type3": "false", "boolean_type4": false, "boolean_type5": true, "boolean_type6": 0};
        	var err = null;
        	try {
	        	utils.mergeProperties(object, req.params, ["date_created"]);
        	}
        	catch(ex) {
        		err = ex;
        	}
            assert(!err, "No error in mergeProperties.");
            assert.equal(object.boolean_type1, true, "object.boolean_type1 should be true. Actual value: " + object.boolean_type1);
            assert.equal(object.boolean_type2, true, "object.boolean_type2 should be true. Actual value: " + object.boolean_type2);
            assert.equal(object.boolean_type3, false, "object.boolean_type3 should be false. Actual value: " + object.boolean_type3);
            assert.equal(object.boolean_type4, false, "object.boolean_type4 should be false. Actual value: " + object.boolean_type4);
            assert.equal(object.boolean_type5, true, "object.boolean_type5 should be true. Actual value: " + object.boolean_type5);
            assert.equal(object.boolean_type6, false, "object.boolean_type6 should be false. Actual value: " + object.boolean_type6);
            done();
        });
    });
});