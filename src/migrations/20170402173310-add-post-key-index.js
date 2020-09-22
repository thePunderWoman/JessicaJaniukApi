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
    return Promise.resolve();
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('PostKeyDateIndex');
  }
};
