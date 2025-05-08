const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefone: {
    type: String,
  },
  cpf: {
    type: String,
    unique: true,
  },
  endereco: {
    type: String,
  },
  numero: {
    type: Number,
  },
  cidade: {
    type: String,
  },
  dataDeNascimento: {
    type: Date,
  },
  senha: {
    type: String,
    required: true,
  },
  acesso: {
    type: Boolean,
    default: false,
  },
  cargo: {
    type: String,
  },
}, {
  timestamps: false,
  collection: 'Usuarios',
});


module.exports = mongoose.model('Usuario', usuarioSchema)