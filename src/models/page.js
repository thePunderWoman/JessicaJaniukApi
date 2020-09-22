'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('Page', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    key: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Page.hasMany(models.Meta, { foreignKey: 'pageId'});
      }
    }
  });
  return Page;
};
