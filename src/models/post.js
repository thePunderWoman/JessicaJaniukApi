'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    published: DataTypes.BOOLEAN,
    publishDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: () => {
        // associations can be defined here
      }
    }
  });
  return Post;
};
