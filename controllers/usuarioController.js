const { UsuarioBuilder } = require("../builders/usuario")
const { Usuario } = require('../models')

const listarUsuarios = async(req, res) => {
    try{
        const usuarios = await Usuario.findAll()
        res.status(200).render("usuarios", {usuarios: usuarios})
    } catch(erro) {
        res.status(500).render("error", {mensagem: erro.mesage})
    }
}

const criarCliente = (req, res) => {
    try {
        const cargo = req.params.cargo
        res.render("forms/usuario", { cargo: "cliente" })
    } catch (erro) {
        res.status(500).render('error', { error: error.message })
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

const criarAdm = (req, res) => {
    try {
        const cargo = req.params.cargo
        res.render("forms/usuario", { cargo: "administrador" })
    } catch (erro) {
        res.status(500).render('error', { error: error.message })
        throw new Error(erro)
    }
}

const perfil = async (req, res) => {
    try {
        const codigo = req.params.codigo
        const usuario = await Usuario.findOne({ where: { codigo } })

        if (!usuario) {
            return res.status(404).render('error', { error: 'Usuário não encontrado' });
        }

        res.render("perfil", { usuarioBuscado: usuario.dataValues })
    } catch (erro) {
        res.status(500).render('error', { mensagem: erro.mesage })
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

const atualizarUsuario = async (req, res) => {
    try {
        const { codigo } = req.params;
        console.log(req.body)
        const { nome, email, telefone, endereco, numero, cidade, dataDeNascimento, senha } = req.body;

        const usuario = await Usuario.findByPk(codigo);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado.');
        }

        usuario.nome = nome;
        usuario.email = email;
        usuario.telefone = telefone;
        usuario.endereco = endereco;
        usuario.numero = numero;
        usuario.cidade = cidade;
        usuario.dataDeNascimento = dataDeNascimento;


        if (senha) {
            usuario.senha = senha;
        }
        
        await usuario.save();
        res.redirect(`/usuario/perfil/${codigo}`);
    } catch (erro) {
        res.status(500).render("error", { mensagem: erro.message })
    }
};

const excluir = async(req, res) => {
    try{
        const { codigo } = req.params
        const usuario = await Usuario.findOne({ where: { codigo } })

        if (!usuario) {
            res.status(404).render("error", { mensagem: "Usuario não encontrado" });
            return
        }

        await usuario.destroy()
        res.status(200).redirect("/usuario")
    } catch(erro) {
        res.status(500).render("error", { mensagem: erro.message })
    }
}

module.exports = {
    cadastrar,
    criarCliente,
    criarProfissional,
    criarAdm,
    atualizarUsuario,
    perfil,
    listarUsuarios,
    excluir
}