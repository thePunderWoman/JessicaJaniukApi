import Sequelize from 'sequelize';
import { sequelize } from './index.mjs';

const { DataTypes, Model } = Sequelize;

export class PostTag extends Model {}

PostTag.init({
  // Model attributes are defined here
  PostId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TagId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},{
  sequelize, // We need to pass the connection instance
  modelName: 'PostTag' // We need to choose the model name
});
