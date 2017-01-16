var bcrypt = require('bcrypt');

exports.cryptPassword = function(password) {
  var salt = bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

exports.comparePassword = function(password, userPassword) {
  return bcrypt.compare(password, userPassword);
};
