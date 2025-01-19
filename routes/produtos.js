var express = require('express');
var router = express.Router();
const { listarProdutos, produto, buscarProduto } = require("../controllers/produtos")
const { listar, cadastrar, criar, editar, atualizar, excluir } = require("../controllers/produtoController")

/* GET home page. */
router.get('/', listar);
router.get('/form/produto', criar)
router.get('/produto/:titulo', produto);
router.get('/buscar', buscarProduto);
router.post('/', cadastrar)
router.get('/editar-produto/:codigo', editar)
router.post('/atualizar-produto/:codigo', atualizar)
router.post('/excluir-produto/:codigo', excluir)

module.exports = router;
