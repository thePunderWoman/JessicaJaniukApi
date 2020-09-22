import Sequelize from 'sequelize';
import {config as cfg} from '../config/config.js';

let env       = process.env.NODE_ENV || 'development';
let config    = cfg[env];
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: true /* for SSL config since Heroku gives you this out of the box */
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });
}

export { sequelize };
