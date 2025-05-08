const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemPedidoSchema = new Schema({
  Usuario_codigo: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  Estoque_codigo: {
    type: Schema.Types.ObjectId,
    ref: 'Estoque',
    required: true,
  },
  quantidadeTotal: {
    type: Number,
    required: true,
  },
  valorTotal: {
    type: Number,
    required: true,
  },
  concluido: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: false,
  collection: 'ItensPedidos',
})

module.exports = mongoose.model('ItemPedido', itemPedidoSchema);