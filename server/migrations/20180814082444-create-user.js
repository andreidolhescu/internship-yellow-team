'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FirstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      LastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Mail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Admin: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      Points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Path: {
        type: Sequelize.STRING,
        defaultValue: "public/images/defaultuser.jpg"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};