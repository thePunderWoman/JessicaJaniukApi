'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Posts','key',{ type: Sequelize.STRING, allowNull: false, defaultValue: '' } );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Posts', 'key');
  }
};
