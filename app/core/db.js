var settings 		= require('../../config/settings')
		, MySQL 		= require('mysql')
		, Pool 			= require('generic-pool')
		, EasyMySQL = require('easy-mysql');

var mysql = EasyMySQL.connect_with_easy_pool(settings.database);

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var convertArrays = function (data) {
	//single row
	if (!data.length) {
		for(var prop in data) {
			if (prop.endsWith("_ids")) {
				data[prop] = splitArrayAsInts(data[prop]);
			}
		}
	}

	//multiple rows
	for (var i=0; i<data.length; i++) {
		for(var prop in data[i]) {
			if (prop.endsWith("_ids")) {
				data[i][prop] = splitArrayAsInts(data[i][prop]);
			}
		}
	}
};

var splitArrayAsInts = function(data) {
  data = data.split(",");

  for (var i=0; i < data.length; i++) {
    if (i ==0 && data[i] == "") return [];
    data[i] = parseInt(data[i]);
  }
  return data;
};


module.exports = {
	run: function (options)  {
		//construct call statement based on how many sql parameters were passed
		var q = '?', a = [];
		while(a.length < options.sqlParams.length) {
		  a.push(q);
		}
		var sql = a.join(',');
		sql = 'call ' + options.routine + '(' + sql + ')';

		//spin it up
		//console.log('sql: ' + sql);
		//console.log('options.sqlParams: ' + JSON.stringify(options.sqlParams));

		mysql.execute(sql, options.sqlParams,
			function (err, result) {
				if(err) {
					if (options.next)
						return options.next(err);
					else
						throw err;
				}
				else {
					var member = (options.arrayLength == 'one') ? result[0][0] : result[0];
					if(member) {
						if (options.send) {
							convertArrays(member);
							options.res.send(member);
							options.next();
						}
						else {
							convertArrays(member);
							options.next(member);
						}
					}
					else {
						return options.next(new Restify.ResourceNotFoundError("Resource Not Found"));
					}
				}
			}
		);
	},

	sendOne: function (routine, sqlParams, req, res, next)  {
		this.run({
			routine: routine,
			sqlParams: sqlParams,
			arrayLength: 'one',
			req: req,
			res: res,
			next: next,
			send: true
		});
	},

	sendMany: function (routine, sqlParams, req, res, next)  {
		this.run({
			routine: routine,
			sqlParams: sqlParams,
			arrayLength: 'all',
			req: req,
			res: res,
			next: next,
			send: true
		});
	},

	executeOne: function (routine, sqlParams, req, res, next)  {
		this.run({
			routine: routine,
			sqlParams: sqlParams,
			arrayLength: 'one',
			req: req,
			res: res,
			next: next,
			send: false
		});
	},

	executeMany: function (routine, sqlParams, req, res, next)  {
		this.run({
			routine: routine,
			sqlParams: sqlParams,
			arrayLength: 'all',
			req: req,
			res: res,
			next: next,
			send: false
		});
	}
};
