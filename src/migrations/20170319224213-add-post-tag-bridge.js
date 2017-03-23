'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('PostTag', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('PostTag');
  }
};
