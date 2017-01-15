var Post = require('./post');

module.exports = function(orm, db){

  var Comment = db.define('comment', {
    comment_text: {type: 'text'},
    comment_date: {type: 'date', time: true},
    is_deleted: {type: 'boolean'}
  });

  Comment.hasOne('post', Post, {reverse: 'comments'});

}