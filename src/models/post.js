import Sequelize from 'sequelize';
import { Meta } from './meta.js';
import { sequelize } from './index.js';
import { Category } from './category.js';
import { Tag } from './tag.js';
import { PostTag } from './postTag.js';

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