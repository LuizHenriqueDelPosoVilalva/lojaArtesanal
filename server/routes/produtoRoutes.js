var express = require('express');
var router = express.Router();
const {middlewareAutenticacao} = require('../middleware/middlewareAutenticacao')
const { listar, cadastrar, criar, editar, atualizar, excluir, buscarPorTitulo, buscarPorCodigo } = require("../controllers/produtoController")

/* GET home page. */
router.get('/', listar);
router.get('/form/produto', middlewareAutenticacao(['administrador', 'profissional']), criar)
router.get('/produto/:id', middlewareAutenticacao(['administrador', 'profissional', 'cliente']),buscarPorCodigo)
router.get('/buscar', buscarPorTitulo);
router.post('/', middlewareAutenticacao(['administrador', 'profissional']),cadastrar)
router.get('/editar-produto/:id', middlewareAutenticacao(['administrador']), editar)
router.post('/atualizar-produto/:id', middlewareAutenticacao(['administrador']), atualizar)
router.post('/excluir-produto/:id', middlewareAutenticacao(['administrador']), excluir)

module.exports = router
