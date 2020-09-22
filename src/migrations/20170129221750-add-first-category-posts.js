'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.insert(queryInterface.sequelize.models.Category, 'Categories', { 
      name: 'Personal',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {});
    queryInterface.select(queryInterface.sequelize.models.Category, 'Categories', {
      where: {
        'name': 'Personal'
      }
    })
      .then((categories) => {
        queryInterface.sequelize.query('UPDATE "Posts" SET "categoryId" = ' + categories[0].id);
        queryInterface.changeColumn(
          'Posts',
          'categoryId',
          {
            type: Sequelize.INTEGER,
            references: 'Categories',
            referenceKey: 'id',
          }
        );
      });
    return Promise.resolve();
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('DELETE FROM "Categories" WHERE name="Personal"');
  }
};
