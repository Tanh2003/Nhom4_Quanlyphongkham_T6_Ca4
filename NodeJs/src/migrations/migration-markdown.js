'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('markdowns', {
     

       
        
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contentHTML: {
        allowNull:false,
        type: Sequelize.TEXT('long')
      },
      contentMarkdown: {
        allowNull:false,
        type: Sequelize.TEXT('long')
      },
      description: {
        allowNull:true,
        type: Sequelize.TEXT('long')
      },
      doctorId: {
    
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      specialtyId: {
        
        type: Sequelize.INTEGER,
        allowNull: true,
       
      },
      clinicId: {
        allowNull:true,
        type: Sequelize.INTEGER
      },
      createdAt: {
       
        type: Sequelize.DATE,
        allowNull: false,

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('markdowns');
  }
};