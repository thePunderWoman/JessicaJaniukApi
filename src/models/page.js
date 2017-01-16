'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('Page', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Page;
};
