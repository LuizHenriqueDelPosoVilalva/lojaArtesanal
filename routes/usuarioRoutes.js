var express = require('express');
var router = express.Router();
const {cadastrar, criarAdm, criarCliente, criarProfissional, atualizarUsuario, perfil, listarUsuarios, excluir} = require("../controllers/usuarioController")
const {middlewareAutenticacao} = require('../middleware/middlewareAutenticacao')

router.get("/", middlewareAutenticacao(['administrador']),listarUsuarios)
router.post("/excluir/:codigo", excluir)
router.post("/:cargo", cadastrar)
router.post("/atualizar/:codigo", atualizarUsuario)
router.get("/formulario/cliente",criarCliente)
router.get("/perfil/:codigo",perfil)
router.get("/formulario/profissional", middlewareAutenticacao(['administrador']),criarProfissional)
router.get("/formulario/administrador",middlewareAutenticacao(['administrador']),criarAdm)

module.exports = router;