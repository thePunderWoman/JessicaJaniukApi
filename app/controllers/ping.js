var settings = require('../../config/settings');

module.exports = {
	get: function (req, res, next)  {
		res.send({
			name: "jessica-janiuk-api v" + settings.version + " " + settings.env,
			status: "running"
		});
		next();
	}
};
