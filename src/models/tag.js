import Sequelize from 'sequelize';
import { sequelize } from './index.js';

const { DataTypes, Model } = Sequelize;

export class Tag extends Model {}

Tag.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  sequelize, // We need to pass the connection instance
  modelName: 'Tag' // We need to choose the model name
});
