'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Posts',
      'content',
      {
        type: Sequelize.TEXT
      }
    );
    return queryInterface.changeColumn(
      'Pages',
      'content',
      {
        type: Sequelize.TEXT
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Posts',
      'content',
      {
        type: Sequelize.STRING
      }
    );
    return queryInterface.changeColumn(
      'Pages',
      'content',
      {
        type: Sequelize.STRING
      }
    );
  }
};
