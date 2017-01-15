var orm = require('orm');

module.exports = function (query) {
  var filter = {}
  for (var key in query) {

    // split key on double underscore
    var split_key = key.split("__");

    // check length of split
    if (split_key.length > 1) {
      var operator = split_key[split_key.length - 1]
        , _key = split_key[0];

      switch(operator) {
        case "ne":
          filter[_key] = orm.ne(query[key]);
          break;
        case "gt":
          filter[_key] = orm.gt(query[key]);
          break;
        case "gte":
          filter[_key] = orm.gte(query[key]);
          break;
        case "lt":
          filter[_key] = orm.lt(query[key]);
          break;
        case "lte":
          filter[_key] = orm.lte(query[key]);
          break;
        case "in":
          filter[_key] = query[key].split(',');
          break;
        case "btwn":
          var l = query[key].split(',')[0]
            , r = query[key].split(',')[query[key].split(',').length - 1];
          filter[_key] = orm.between(l, r);
          break;
        case "like":
          filter[_key] = orm.like("%" + query[key] + "%");
          break;
        default:
          throw new Error("could not parse filter operator `" + operator + "`");
      }

    } 
    else {
      filter[key] = query[key];
    }
  }

  return filter;
}
