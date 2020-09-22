'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tag.belongsToMany(models.Post, {through: models.PostTag});
      }
    }
  });
  return Tag;
};
