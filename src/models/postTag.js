'use strict';

module.exports = function(sequelize, DataTypes) {
  var PostTag = sequelize.define('PostTag', {
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function() {
      }
    }
  });

  return PostTag;
};
