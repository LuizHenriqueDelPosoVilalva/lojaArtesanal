'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estoque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estoque.belongsTo(models.Produto, {
        foreignKey: 'Produto_codigo',
        onDelete: 'CASCADE',
      });
    }
  }
  Estoque.init({
    codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Produto_codigo: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    dataDeEntrada: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Estoque',
    freezeTableName: true
  });
  return Estoque;
};