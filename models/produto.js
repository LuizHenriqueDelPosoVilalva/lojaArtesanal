'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.hasMany(models.Estoque, {
        foreignKey: 'Produto_codigo',
        onDelete: 'CASCADE',
      });
      Produto.hasMany(models.ItemPedido, {
        foreignKey: 'Estoque_codigo',
        onDelete: 'CASCADE',
      });
    }
  }
  Produto.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    imagem: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produto',
    freezeTableName: true
  });
  return Produto;
};