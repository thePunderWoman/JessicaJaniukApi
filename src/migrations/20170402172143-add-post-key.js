'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Posts','key',{ type: Sequelize.STRING, allowNull: false, defaultValue: '' } );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Posts', 'key');
  }
};
