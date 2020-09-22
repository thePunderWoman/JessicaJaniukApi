'use strict';

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here 
        Category.hasMany(models.Post, { foreignKey: 'categoryId'});
      }
    }
  });

  return Category;
};
