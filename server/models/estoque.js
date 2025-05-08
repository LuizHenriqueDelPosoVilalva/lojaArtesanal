const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estoqueSchema = new Schema({
  Produto_codigo: {
    type: Schema.Types.ObjectId,
    ref: 'Produto',
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  dataDeEntrada: {
    type: Date,
    required: true,
  },
}, {
  timestamps: false,
  collection: 'Estoque',
});

module.exports = mongoose.model('Estoque', estoqueSchema);