var dbm = require('db-migrate');
var moment = require('moment');
var type = dbm.dataType;

exports.up = function(db, callback) {
	db.insert('post', ['id', 'title', 'post_date', 'is_deleted'], [1, 'My First Post', moment().format(), false]);
	db.insert('post', ['id', 'title', 'post_date', 'is_deleted'], [2, 'Another Post', moment().format(), false]);
	db.insert('post', ['id', 'title', 'post_date', 'is_deleted'], [3, 'Thirdly', moment().format(), false]);
	db.insert('comment', ['id', 'post_id', 'comment_text', 'comment_date', 'is_deleted'], [1, 1, 'Post 1 is a great post.', moment().format(), false]);
	db.insert('comment', ['id', 'post_id', 'comment_text', 'comment_date', 'is_deleted'], [2, 2, 'Post 2 is a decent post.', moment().format(), false]);
	db.insert('comment', ['id', 'post_id', 'comment_text', 'comment_date', 'is_deleted'], [3, 2, 'Post 2 needs some work.', moment().format(), false]);
	db.insert('comment', ['id', 'post_id', 'comment_text', 'comment_date', 'is_deleted'], [4, 3, 'Post 3 is terrible.', moment().format(), false]);
	db.insert('comment', ['id', 'post_id', 'comment_text', 'comment_date', 'is_deleted'], [5, 3, 'Post 3 is awesome.', moment().format(), false]);
	db.insert('comment', ['id', 'post_id', 'comment_text', 'comment_date', 'is_deleted'], [6, 3, 'Post 3 is not so bad.', moment().format(), false]);
	callback();
};

exports.down = function(db, callback) {
	db.runSql("truncate table comment;", []);
	db.runSql("truncate table post;", []);
	callback();
};
