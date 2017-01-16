'use strict';
var passwordHelper = require('../helpers/passwordHelper');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Jessica',
      lastName: 'Janiuk',
      email: 'jessica.janiuk@gmail.com',
      username: 'jessica',
      password: passwordHelper.cryptPassword('1amajedI!'),
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
