var utils = {
	mergeProperties : function(object, params, forbiddenProps) {
		if (!forbiddenProps) {
			// console.log('forbiddenProps not passed. creating...', typeof forbiddenProps)
			forbiddenProps = [];
		}
		forbiddenProps.push('id');	//always forbid updating the id!

		var bools = ["0","1","false","true"];
		// console.log('object', object);
		// console.log('params', params);
		// console.log('forbiddenProps', forbiddenProps);

		for(p in params) {
			// console.log('----------------------');
			// console.log('params[p] : ', params[p]);
			// console.log('object[p] : ', object[p] );
			if (
				//the passed param is of the same type as the matching property on the object
				(typeof object[p] === typeof params[p] || object[p] === null || (typeof object[p] === "boolean" && bools.indexOf(params[p].toString().toLowerCase()) !== -1))
				//either allowedProps wasn't passed, or it was and the param is one of the allowedProps
				&& (forbiddenProps.indexOf(p) === -1)
				//the value has changed
				&& (object[p] == null && params[p] != null || object[p] !== params[p])
			) {	
				if (typeof object[p] === "boolean") {
					var val = params[p];
					// console.log('p', p);
					// console.log('typeof val', typeof val);
					if (typeof val === "number") {
						val = (val == 1);
						// console.log('params[p]', params[p]);
					}
					else if (typeof val === "string") {
						val = (val.toLowerCase() == "true");
						// console.log('params[p]', params[p]);
					}
					params[p] = val;
					// console.log('params[p]', params[p]);
				}
				object[p] = params[p];
			}
		}
	},

	createNewModel: function(model, params, forbiddenProps) {
		var object = {};
		for(var p in model.properties) {
			if (p != "id")
				object[p] = null;
		}
		utils.mergeProperties(object, params);
		return object;
	}
};

module.exports = utils;