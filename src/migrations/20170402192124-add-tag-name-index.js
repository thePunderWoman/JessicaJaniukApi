'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex(
      'Tags',
      ['name'],
      {
        indexName: 'TagNameIndex'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('TagNameIndex');
  }
};
