import Sequelize from 'sequelize';
import { sequelize } from './index.mjs';

const { DataTypes, Model } = Sequelize;

export class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
},{
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});
