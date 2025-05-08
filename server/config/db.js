const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://luizvilalva:luizhuebr7849497@lojaartesanal.bylbvdn.mongodb.net/lojaartesanal?retryWrites=true&w=majority'

const mongooseConfig = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err))

module.exports = mongooseConfig