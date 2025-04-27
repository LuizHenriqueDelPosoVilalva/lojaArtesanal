
const { Estoque, ItemPedido, Produtos } = require ('../models');

const adicionarCarrinho = async (req, res) => {
    try {
        const { produtoCodigo, usuarioCodigo, quantidade } = req.body;

        const estoque = await Estoque.findOne({
            Produto_codigo: produtoCodigo,
        });

        if (!estoque || estoque.quantidade < quantidade) {
            return res.status(400).render("error", { mensagem: 'Estoque insuficiente ou produto não encontrado.' });
        }

        const produto = await Produtos.findOne({
            codigo: produtoCodigo,
        });

        if (!produto) {
            return res.status(404).render("error", { mensagem: 'Produto não encontrado.' });
        }

        const valorTotal = produto.preco * quantidade;

        await ItemPedido.create({
            Usuario_codigo: usuarioCodigo,
            Estoque_codigo: estoque._id,
            quantidadeTotal: quantidade,
            valorTotal: valorTotal,
            concluido: false,
        });

        res.status(201).render("success", { mensagem: "Produto adicionado no carrinho" });
    } catch (erro) {
        res.status(500).render("error", { mensagem: `${erro}` });
    }
};

const listarCarrinho = async (req, res) => {
    try {
        const { usuarioCodigo } = req.params;

        const itensCarrinho = await ItemPedido.find({
            Usuario_codigo: usuarioCodigo,
            concluido: false,
        }).populate({
            path: 'Estoque_codigo',
            populate: { path: 'Produto_codigo' },
        });

        res.render('carrinho', { itensCarrinho });
    } catch (erro) {
        return res.status(403).render('error', { mensagem: erro.message });
    }
};

const concluirCarrinho = async (req, res) => {
    try {
        const { itensCodigo } = req.body;

        const itensCarrinho = await ItemPedido.find({
            codigo: { $in: itensCodigo },
        }).populate('Estoque_codigo');

        for (const item of itensCarrinho) {
            const estoque = await Estoque.findOne({
                _id: item.Estoque_codigo,
            });

            if (!estoque || estoque.quantidade < item.quantidadeTotal) {
                return res.status(400).render("error", {
                    mensagem: `Estoque insuficiente para o item: ${item.Estoque_codigo}`,
                });
            }

            estoque.quantidade -= item.quantidadeTotal;
            await estoque.save();
        }

        await ItemPedido.updateMany(
            { codigo: { $in: itensCodigo } },
            { concluido: true }
        );

        res.status(201).render("success", { mensagem: "Compra Efetuada com Sucesso" });
    } catch (erro) {
        res.status(500).render('error', { mensagem: `Erro ao concluir itens: ${erro}` });
    }
};

module.exports = {
    adicionarCarrinho,
    listarCarrinho,
    concluirCarrinho
};