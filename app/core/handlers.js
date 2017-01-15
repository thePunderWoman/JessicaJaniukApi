var utils = require('../core/utils');

module.exports = {
	getHandler: function(req, res, next, err, data) {
		if(err) {
			req.log.error(err);
			res.send(err);
		} 
		else {
			res.send(data);
			next();
		}
	},

	putHandler: function(req, res, next, err, data) {
		if(err) {
			req.log.error(err);
			res.send(err);
		} 
		else {
			utils.mergeProperties(data, req.params);
			data.save(function(err) {
				if (err) {
					req.log.error(err);
					res.send(err);
				}
				else {
					res.send(data);
					next();
				}
			});
		}
	},

	createHandler: function(req, res, next, err, data) {
		if (err) {
			req.log.error(err);
			res.send(err);
		}
		else {
			res.send(data);
			next();
		}
	},

	delHandler: function(req, res, next, err, data) {
		if(err) {
			req.log.error(err);
			res.send(err);
		} 
		else {
			data.remove(function(err) {
				if (err) {
					req.log.error(err);
					res.send(err);
				}
				else {
					res.send(data);
					next();
				}
			});
		}

	}
}