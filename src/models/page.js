'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('Page', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    key: DataTypes.STRING,
  }, {
    classMethods: {
      associate: () => {
        // associations can be defined here
      }
    }
  });
  return Page;
};
