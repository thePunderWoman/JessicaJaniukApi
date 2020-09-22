import Sequelize from 'sequelize';
import { sequelize } from './index.mjs';

const { DataTypes, Model } = Sequelize;

export class Category extends Model {}

Category.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Category' // We need to choose the model name
});
