import Sequelize from 'sequelize';
import { Meta } from './meta.mjs';
import { sequelize } from './index.mjs';

const { DataTypes, Model } = Sequelize;

export class Page extends Model {}

Page.init({
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
},{
  sequelize, // We need to pass the connection instance
  modelName: 'Page' // We need to choose the model name
});

Page.hasMany(Meta, { foreignKey: 'pageId'});
Meta.belongsTo(Page, { foreignKey: 'id'});