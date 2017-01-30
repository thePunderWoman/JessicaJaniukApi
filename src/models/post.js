'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    published: DataTypes.BOOLEAN,
    publishDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Post.belongsTo(models.Category, { foreignKey: 'categoryId'});
      }
    }
  });
  return Post;
};
