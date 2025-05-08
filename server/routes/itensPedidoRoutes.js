const express = require('express')
const { listarCarrinho, concluirCarrinho, adicionarCarrinho } = require('../controllers/itemPedidoController')
const { middlewareAutenticacao } = require('../middleware/middlewareAutenticacao')

const router = express.Router()

router.get('/:usuarioCodigo', middlewareAutenticacao(['administrador', 'profissional', 'cliente']), listarCarrinho)

router.post('/concluir', middlewareAutenticacao(['administrador', 'profissional', 'cliente']), concluirCarrinho)

router.post('/adicionar', middlewareAutenticacao(['administrador', 'profissional', 'cliente']), adicionarCarrinho)

module.exports = router
