module.exports = function(orm, db){
  var Post = db.define('post', {
    title: {type: 'text'},
    post_date: {type: 'date', time: true},
    is_deleted: {type: 'boolean'}
  });
}