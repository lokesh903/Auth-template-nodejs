'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // This method will be called when you run the migration
    await queryInterface.removeColumn('users', 'access_token');
  },

  down: async (queryInterface, Sequelize) => {
    // This method will be called when you roll back the migration
    await queryInterface.addColumn('users', 'access_token', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
