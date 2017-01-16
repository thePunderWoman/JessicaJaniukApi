'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users','isAdmin',Sequelize.BOOLEAN);
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('Users','isAdmin');
  }
};
