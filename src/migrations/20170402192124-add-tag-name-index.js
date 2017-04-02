'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'Tags',
      ['name'],
      {
        indexName: 'TagNameIndex'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('TagNameIndex');
  }
};
