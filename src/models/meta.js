'use strict';
module.exports = function(sequelize, DataTypes) {
  var Meta = sequelize.define('Meta', {
    tag: DataTypes.STRING,
    value: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    pageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Meta.belongsTo(models.Post, { foreignKey: 'id'});
        Meta.belongsTo(models.Page, { foreignKey: 'id'});
      }
    }
  });
  return Meta;
};
