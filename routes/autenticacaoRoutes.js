var express = require('express');
var router = express.Router();
var { login, logout, autenticar } = require('../controllers/autenticacaoController');

router.post('/login', login);
router.get('/logout', logout);
router.get('/', autenticar);

module.exports = router
