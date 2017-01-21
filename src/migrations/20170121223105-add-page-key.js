'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Pages','key',Sequelize.STRING);
    return queryInterface.addIndex(
      'Pages',
      ['key'],
      {
        indexName: 'PageKeyIndex',
        indicesType: 'BTREE'
      }
    );
  },

  down: function (queryInterface) {
    queryInterface.removeIndex('Pages', 'PageKeyIndex');
    return queryInterface.removeColumn('Pages','key');
  }
};
