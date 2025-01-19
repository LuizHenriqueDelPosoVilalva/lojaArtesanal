var express = require('express');
var router = express.Router();
const { listarProdutos, produto, buscarProduto } = require("../controllers/produtos")
const { listar, cadastrar, criar, editar, atualizar, excluir, buscarPorTitulo, buscarPorCodigo } = require("../controllers/produtoController")

/* GET home page. */
router.get('/', listar);
router.get('/form/produto', criar)
router.get('/produto/:codigo', buscarPorCodigo);
router.get('/buscar', buscarPorTitulo);
router.post('/', cadastrar)
router.get('/editar-produto/:codigo', editar)
router.post('/atualizar-produto/:codigo', atualizar)
router.post('/excluir-produto/:codigo', excluir)

module.exports = router;
