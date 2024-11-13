var express = require('express');
var router = express.Router();
const {listarProdutos, produto, buscarProduto} = require("../controllers/produtos")

/* GET home page. */
router.get('/', listarProdutos);
router.get('/produto/:titulo', produto);
router.get('/buscar', buscarProduto);

module.exports = router;
