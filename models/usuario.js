'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.ItemPedido, {
        foreignKey: 'Usuario_codigo',
        onDelete: 'CASCADE',
      });
    }
  }
  Usuario.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    cidade: DataTypes.STRING,
    dataDeNascimento: DataTypes.DATE,
    senha: DataTypes.STRING,
    acesso: DataTypes.BOOLEAN,
    cargo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName: true
  });
  return Usuario;
};