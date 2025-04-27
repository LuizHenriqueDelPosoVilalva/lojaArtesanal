const { UsuarioBuilder } = require('../builders/usuario');
const { Usuario } = require('../models');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    console.log('Usuários encontrados:', usuarios);
    res.status(200).render("usuarios", { usuarios });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).render("error", { mensagem: error.message });
  }
};

const criarCliente = (req, res) => {
  res.render("forms/usuario", { cargo: "cliente" });
};

const criarProfissional = (req, res) => {
  res.render("forms/usuario", { cargo: "profissional" });
};

const criarAdm = (req, res) => {
  res.render("forms/usuario", { cargo: "administrador" });
};

const perfil = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Buscando usuário com _id:", id);

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).render('error', { mensagem: 'Usuário não encontrado' });
    }

    res.render("perfil", { usuarioBuscado: usuario });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).render('error', { mensagem: error.message });
  }
};

const cadastrar = async (req, res) => {
  try {
    const { nome, email, telefone, cpf, endereco, numero, cidade, dataDeNascimento, senha } = req.body;
    const cargo = req.params.cargo;
  
    if (!nome || !email || !senha) {
      return res.status(400).render('error', { mensagem: 'Nome, email e senha são obrigatórios' });
    }

    const usuarioBuilder = new UsuarioBuilder()
      .setNome(nome)
      .setEmail(email)
      .setTelefone(telefone)
      .setCpf(cpf)
      .setEndereco(endereco)
      .setNumero(numero ? parseInt(numero) : undefined)
      .setCidade(cidade)
      .setDataDeNascimento(dataDeNascimento ? new Date(dataDeNascimento) : undefined)
      .setSenha(senha)
      .setAcesso(cargo === 'administrador' || cargo === 'profissional')
      .setCargo(cargo);

    const usuario = await usuarioBuilder.save();
    await Usuario.create(usuario)

    res.status(201).render("success", { mensagem: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).render('error', { mensagem: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, endereco, numero, cidade, dataDeNascimento, senha } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).render('error', { mensagem: 'Usuário não encontrado' });
    }

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    usuario.telefone = telefone || usuario.telefone;
    usuario.endereco = endereco || usuario.endereco;
    usuario.numero = numero ? parseInt(numero) : usuario.numero;
    usuario.cidade = cidade || usuario.cidade;
    usuario.dataDeNascimento = dataDeNascimento ? new Date(dataDeNascimento) : usuario.dataDeNascimento;

    if (senha) {
      usuario.senha = senha;
    }

    await usuario.save();
    res.redirect(`/usuario/perfil/${id}`);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).render("error", { mensagem: error.message });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).render("error", { mensagem: "Usuário não encontrado" });
    }

    await Usuario.deleteOne({ _id: id });
    res.status(200).redirect("/usuario");
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).render("error", { mensagem: error.message });
  }
};

const bloquearOuLiberarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).render('error', { mensagem: 'Usuário não encontrado' });
    }

    usuario.acesso = !usuario.acesso;
    await usuario.save();

    const mensagem = usuario.acesso
      ? 'Acesso do usuário liberado com sucesso.'
      : 'Acesso do usuário bloqueado com sucesso.';

    res.status(200).render("success", { mensagem });
  } catch (error) {
    console.error("Erro ao bloquear/liberar usuário:", error);
    res.status(500).render('error', { mensagem: error.message });
  }
};

module.exports = {
  cadastrar,
  criarCliente,
  criarProfissional,
  criarAdm,
  atualizarUsuario,
  perfil,
  listarUsuarios,
  excluir,
  bloquearOuLiberarUsuario,
};