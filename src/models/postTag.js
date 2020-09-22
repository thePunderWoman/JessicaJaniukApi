'use strict';

module.exports = function(sequelize, DataTypes) {
  var PostTag = sequelize.define('PostTag', {
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function() {
      }
    }
  });

  return PostTag;
};
