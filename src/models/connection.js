'use strict';
module.exports = function(sequelize, DataTypes) {
  var Connection = sequelize.define('Connection', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    linktext: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Connection;
};
