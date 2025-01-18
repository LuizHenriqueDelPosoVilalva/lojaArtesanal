var express = require('express');
var router = express.Router();
const {listarProdutos, produto, buscarProduto} = require("../controllers/produtos")
const {listar, cadastrar} = require("../controllers/produtoController")

/* GET home page. */
router.get('/', listar);
router.get('/produto/:titulo', produto);
router.get('/buscar', buscarProduto);
router.post('/', cadastrar)

module.exports = router;
