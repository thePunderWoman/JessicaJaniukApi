'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'Posts',
      ['key', 'publishDate'],
      {
        indexName: 'PostKeyDateIndex'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('PostKeyDateIndex');
  }
};
