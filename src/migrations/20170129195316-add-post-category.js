'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Posts','categoryId',Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Posts', 'categoryId');
  }
};
