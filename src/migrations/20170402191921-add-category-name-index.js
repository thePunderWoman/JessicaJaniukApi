'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'Categories',
      ['name'],
      {
        indexName: 'CategoryNameIndex'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('CategoryNameIndex');
  }
};
