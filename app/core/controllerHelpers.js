module.exports = {
  formatErrors: function(errorsIn) {
    var errors = {};
    var a, e;

    for(a = 0; a < errorsIn.length; a++) {
      e = errorsIn[a];

      errors[e.property] = errors[e.property] || [];
      errors[e.property].push(e.msg);
    }
    return errors;
  },

  parseQuery: function(request){
  // parse querystring for reserved keys
    var limit = request.query.limit || 25
      , sort = request.query.sort || null
      , page = request.query.page || 1
      , skip;
      
    limit = parseInt(limit);
    if (page) page = parseInt(page);

    if (page > 0) skip = (page - 1) * limit;
    
    var _sort = ['id', 'Z'];
    if (sort) {
      sort = JSON.parse(JSON.stringify(sort))
      if (sort[0] == '-') {
        _sort = []
        _sort.push(sort.substring(1, sort.length))
        _sort.push("Z")
      } else {
        _sort = sort
      }
    }

    // filter
    delete request.query.limit
    delete request.query.page
    delete request.query.sort
    
    return {request: request, sort: _sort, limit: limit, skip: skip};
  
  }
  
  
};
