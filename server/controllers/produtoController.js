const { Produto, Estoque } = require("../models");

const listar = async (req, res) => {
  try {
    const produtos = await Produto.find()

    if (req.session.usuario) {
      res.render("homeLogado", { produtos: produtos, usuario: req.session.usuario });
    } else {
      res.render("home", { produtos: produtos });
    }
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.render("home", { produtos: [] });
    throw new Error();
  }
};

const buscarPorCodigo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("CHEGOU AQUI: ",id);

    const produto = await Produto.findById(id);

    if (!produto) {
      res.status(404).render("error", { mensagem: "Produto não encontrado" });
      return;
    }

    res.status(200).render("produto", { produto });
  } catch (erro) {
    res.status(500).render("error", { mensagem: erro.message });
  }
};

const buscarPorTitulo = async (req, res) => {
  try {
    const { titulo } = req.query;

    if (!titulo) {
      res.status(400).render("error", { mensagem: "O título é obrigatório para a busca" });
      return;
    }

    const produtos = await Produto.find({
      nome: { $regex: titulo, $options: "i" },
    });

    if (produtos.length === 0) {
      res
        .status(404)
        .render("error", { mensagem: "Nenhum produto encontrado com o título fornecido" });
      return;
    }

    res.status(200).render("home", { produtos });
  } catch (error) {
    res.status(500).render("error", { mensagem: "Erro ao buscar produtos" });
  }
};

const cadastrar = async (req, res) => {
  try {
    const { nome, descricao, preco, imagem, quantidadeEstoque } = req.body;

    if (!nome || !descricao || !preco || !imagem || quantidadeEstoque === undefined) {
      res.status(401).render("error", { mensagem: "Preencha todos os campos" });
      return;
    }

    const produto = await Produto.create({
      nome,
      descricao,
      preco,
      imagem,
    });

    await Estoque.create({
      Produto_codigo: produto._id,
      quantidade: quantidadeEstoque,
      dataDeEntrada: new Date(),
    });

    res.status(201).render("success", { mensagem: "Produto Cadastrado com Sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).render("error", { mensagem: "Erro no servidor, tente mais tarde" });
  }
};

const criar = (req, res) => {
  res.render("./forms/produto");
};

const editar = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findById(id);

    if (!produto) {
      res.status(404).render("error", { mensagem: "Produto não encontrado" });
      return;
    }

    const estoque = await Estoque.findOne({ Produto_codigo: produto._id }) || null;

    res.render("./forms/editarProduto", { produto, estoque });
  } catch (error) {
    console.error("Erro ao buscar produto para edição:", error);
    res.status(500).render("error", { mensagem: "Erro ao buscar produto para edição" });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, imagem, quantidadeEstoque } = req.body;

    const produto = await Produto.findById(id);

    if (!produto) {
      res.status(404).render("error", { mensagem: "Produto não encontrado" });
      return;
    }

    produto.nome = nome;
    produto.descricao = descricao;
    produto.preco = parseFloat(preco);
    produto.imagem = imagem;

    await produto.save();

    if (quantidadeEstoque !== undefined) {
      let estoque = await Estoque.findOne({ Produto_codigo: produto._id });

      if (estoque) {
        estoque.quantidade = parseInt(quantidadeEstoque);
        await estoque.save();
      } else {
        await Estoque.create({
          Produto_codigo: produto._id,
          quantidade: parseInt(quantidadeEstoque),
          dataDeEntrada: new Date(),
        });
      }
    }

    res.status(200).render("success", { mensagem: "Produto e estoque atualizados com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).render("error", { mensagem: "Erro ao atualizar produto" });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await Produto.findById(id);

    if (!produto) {
      res.status(404).render("error", { mensagem: "Produto não encontrado" });
      return;
    }

    await produto.deleteOne();

    res.status(200).render("success", { mensagem: "Produto excluído com sucesso!" });
  } catch (error) {
    res.status(500).render("error", { mensagem: error.message });
  }
};

module.exports = {
  listar,
  cadastrar,
  criar,
  editar,
  atualizar,
  excluir,
  buscarPorCodigo,
  buscarPorTitulo,
};