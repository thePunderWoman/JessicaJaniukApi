'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex(
      'Categories',
      ['name'],
      {
        indexName: 'CategoryNameIndex'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('CategoryNameIndex');
  }
};
