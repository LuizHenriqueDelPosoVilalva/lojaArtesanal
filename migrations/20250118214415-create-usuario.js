'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuario', {
      codigo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      telefone: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cidade: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      dataDeNascimento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      senha: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      acesso: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cargo: {
        type: Sequelize.STRING(20),
        allowNull: true,
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
    await queryInterface.dropTable('Usuario');
  },
};