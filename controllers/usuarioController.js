const { UsuarioBuilder } = require("../builders/usuario")
const { Usuario } = require('../models')

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll()
        res.status(200).render("usuarios", { usuarios: usuarios })
    } catch (erro) {
        res.status(500).render("error", { mensagem: erro.mesage })
    }
}

const criarCliente = (req, res) => {
    try {
        res.render("forms/usuario", { cargo: "cliente" })
    } catch (erro) {
        res.status(500).render('error', { error: erro.message })
    }
}

const criarProfissional = (req, res) => {
    try {
        res.render("forms/usuario", { cargo: "profissional" })
    } catch (erro) {
        res.status(500).render('error', { error: erro.message })
    }
}

const criarAdm = (req, res) => {
    try {
        res.render("forms/usuario", { cargo: "administrador" })
    } catch (erro) {
        res.status(500).render('error', { error: erro.message })
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
        res.status(500).render('error', { error: error.message });
    }
}

const atualizarUsuario = async (req, res) => {
    try {
        const { codigo } = req.params;
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

const excluir = async (req, res) => {
    try {
        const { codigo } = req.params
        const usuario = await Usuario.findOne({ where: { codigo } })

        if (!usuario) {
            res.status(404).render("error", { mensagem: "Usuario não encontrado" });
            return
        }

        await usuario.destroy()
        res.status(200).redirect("/usuario")
    } catch (erro) {
        res.status(500).render("error", { mensagem: erro.message })
    }
}

const bloquearOuLiberarUsuario = async (req, res) => {
    try {
        const { codigo } = req.params;

        const usuario = await Usuario.findOne({ where: { codigo } });
        if (!usuario) {
            return res.status(404).render('error', { mensagem: 'Usuário não encontrado.' });
        }

        usuario.acesso = !usuario.acesso;

        await usuario.save()
        const mensagem = usuario.acesso
            ? 'Acesso do usuário liberado com sucesso.'
            : 'Acesso do usuário bloqueado com sucesso.'

        res.status(200).render("success", { mensagem: mensagem })
    } catch (erro) {
        res.status(500).render('error', { mensagem: erro.message })
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
    excluir,
    bloquearOuLiberarUsuario
}