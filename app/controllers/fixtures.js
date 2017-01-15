var data = require('../../fixtures');

module.exports = {
	deals: function(req, res, next) {
		res.send(data.deals);
		next();
	},

	oneDeal: function(req, res, next) {
		res.send(data.deals.results[0]);
		next();
	},
}