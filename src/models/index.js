'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

let cfg = require('../config/config.json');
let basename  = path.basename(module.filename);
let env       = process.env.NODE_ENV || 'development';
let config    = cfg[env];
let db        = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: true /* for SSL config since Heroku gives you this out of the box */
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
