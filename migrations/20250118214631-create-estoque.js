'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Estoque', {
      codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Produto_codigo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Produto',
          key: 'codigo',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dataDeEntrada: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Estoque');
  },
};