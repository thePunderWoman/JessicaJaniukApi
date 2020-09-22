import Sequelize from 'sequelize';
import { Meta } from './meta.mjs';
import { sequelize } from './index.mjs';
import { Category } from './category.mjs';
import { Tag } from './tag.mjs';
import { PostTag } from './postTag.mjs';

const { DataTypes, Model } = Sequelize;

export class Post extends Model {}

Post.init({
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  publishDate: {
    type: DataTypes.DATE,
  },
},{
  sequelize, // We need to pass the connection instance
  modelName: 'Post' // We need to choose the model name
});

Post.hasMany(Meta, { foreignKey: 'postId'});
Post.belongsTo(Category, { foreignKey: 'categoryId'});
Post.belongsToMany(Tag, {through: PostTag});
Category.hasMany(Post, { foreignKey: 'categoryId'});
Meta.belongsTo(Post, { foreignKey: 'id'});
Tag.belongsToMany(Post, {through: PostTag});