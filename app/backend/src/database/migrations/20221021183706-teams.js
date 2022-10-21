'use-strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    const teamsTable = await queryInterface.createTable('teams', { 
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER 
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return teamsTable
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};