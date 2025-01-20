const { UsuarioBuilder } = require("../builders/usuario")
const {Usuario} = require('../models')

const criarCliente = (req, res) => {
    try {
        const cargo = req.params.cargo
        res.render("forms/usuario", { cargo: "cliente" })
    } catch (erro) {
        res.status(500).render('error', { error: error.message })
        throw new Error(erro)
    }
}

const criarProfissional = (req, res) => {
    try {
        const cargo = req.params.cargo
        res.render("forms/usuario", { cargo: "profissional" })
    } catch (erro) {
        res.status(500).render('error', { error: error.message })
        throw new Error(erro)
    }
}

const criarAdm= (req, res) => {
    try {
        const cargo = req.params.cargo
        res.render("forms/usuario", { cargo: "administrador" })
    } catch (erro) {
        res.status(500).render('error', { error: error.message })
        throw new Error(erro)
    }
}

const cadastrar = async (req, res) => {
    try {
        console.log("chegou em cadastrar")
        const cargo = req.params.cargo
        const { nome, email, telefone, cpf, endereco, numero, cidade, dataDeNascimento, senha } = req.body;

        const usuario = await new UsuarioBuilder()
            .setNome(nome)
            .setEmail(email)
            .setTelefone(telefone)
            .setCpf(cpf)
            .setEndereco(endereco)
            .setNumero(numero)
            .setCidade(cidade)
            .setDataDeNascimento(dataDeNascimento)
            .setSenha(senha)
            .setAcesso(true)
            .setCargo(cargo)
            .save()
        
        await Usuario.create(usuario)

        res.status(201).render("success", { mensagem: "Usuario Cadastrado Com Sucesso" });
    } catch (error) {
        console.log(error)
        res.status(500).render('error', { error: error.message });
    }
}


module.exports = {
    cadastrar,
    criarCliente,
    criarProfissional,
    criarAdm
}