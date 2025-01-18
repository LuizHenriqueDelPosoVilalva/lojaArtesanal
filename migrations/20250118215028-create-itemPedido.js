'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemPedido', {
      codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Usuario_codigo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuario',
          key: 'codigo',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      Estoque_codigo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Estoque',
          key: 'codigo',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      quantidadeTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valorTotal: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('ItemPedido');
  },
};