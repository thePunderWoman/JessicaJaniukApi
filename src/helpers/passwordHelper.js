var bcrypt = require('bcrypt');

exports.cryptPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

exports.comparePassword = function(password, userPassword) {
  return bcrypt.compareSync(password, userPassword);
};
