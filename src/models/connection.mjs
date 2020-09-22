import Sequelize from 'sequelize';
import { sequelize } from './index.mjs';

const { DataTypes, Model } = Sequelize;

export class Connection extends Model {}

Connection.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  linktext: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  sequelize, // We need to pass the connection instance
  modelName: 'Connection' // We need to choose the model name
});
