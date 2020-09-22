import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

const configJSON = fs.readFileSync(`${path.resolve()}/src/config/config.json`);
const cfg = JSON.parse(configJSON);

let env       = process.env.NODE_ENV || 'development';
let config    = cfg[env];
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } 
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });
}

export { sequelize };
