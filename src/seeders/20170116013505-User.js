'use strict';
import passwordHelper from '../helpers/PasswordHelper';

module.exports = {
  up: function (queryInterface) {
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

  down: function () {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
