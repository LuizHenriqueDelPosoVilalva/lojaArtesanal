var express = require('express');
var router = express.Router();
const {cadastrar, criarAdm, criarCliente, criarProfissional, atualizarUsuario, perfil, listarUsuarios, excluir, bloquearOuLiberarUsuario} = require("../controllers/usuarioController")
const {middlewareAutenticacao} = require('../middleware/middlewareAutenticacao')

router.get("/", middlewareAutenticacao(['administrador']),listarUsuarios)
router.post("/excluir/:id", excluir)
router.post("/:cargo", cadastrar)
router.post("/atualizar/:id", atualizarUsuario)
router.get("/formulario/cliente",criarCliente)
router.get("/perfil/:id",perfil)
router.get("/formulario/profissional", middlewareAutenticacao(['administrador']),criarProfissional)
router.get("/formulario/administrador",middlewareAutenticacao(['administrador']),criarAdm)
router.post("/bloquear/:id", middlewareAutenticacao(['administrador']), bloquearOuLiberarUsuario)

module.exports = router;