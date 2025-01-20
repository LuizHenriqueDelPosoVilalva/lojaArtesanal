var express = require('express');
var router = express.Router();
const {cadastrar, criarAdm, criarCliente, criarProfissional} = require("../controllers/usuarioController")
const {middlewareAutenticacao} = require('../middleware/middlewareAutenticacao')

router.post("/:cargo", cadastrar)
router.get("/formulario/cliente",criarCliente)
router.get("/formulario/profissional", middlewareAutenticacao(['administrador']),criarProfissional)
router.get("/formulario/administrador",middlewareAutenticacao(['administrador']),criarAdm)

module.exports = router;