import Sequelize from 'sequelize';
import { sequelize } from './index.js';

const { DataTypes, Model } = Sequelize;

export class Meta extends Model {}

Meta.init({
  // Model attributes are defined here
  tag: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
  },
  pageid: {
    type: DataTypes.INTEGER,
  },
},{
  sequelize, // We need to pass the connection instance
  modelName: 'Meta' // We need to choose the model name
});
