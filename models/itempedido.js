'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemPedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemPedido.belongsTo(models.Usuario, {
        foreignKey: 'Usuario_codigo',
        onDelete: 'CASCADE',
      });
      ItemPedido.belongsTo(models.Estoque, {
        foreignKey: 'Estoque_codigo',
        onDelete: 'CASCADE',
      });
    }
  }
  ItemPedido.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Usuario_codigo: DataTypes.INTEGER,
    Estoque_codigo: DataTypes.INTEGER,
    quantidadeTotal: DataTypes.INTEGER,
    valorTotal: DataTypes.FLOAT,
    concluido: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ItemPedido',
    freezeTableName: true
  });
  return ItemPedido;
};