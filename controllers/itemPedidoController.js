const { Estoque, ItemPedido, Produto } = require('../models')

const adicionarCarrinho = async (req, res) => {
    try {
        const { produtoCodigo, usuarioCodigo, quantidade } = req.body

        const estoque = await Estoque.findOne({
            where: { Produto_codigo: produtoCodigo },
        })

        if (!estoque || estoque.quantidade < quantidade) {
            return res.status(400).render("error", { mensagem: 'Estoque insuficiente ou produto não encontrado.' });
        }

        const produto = await Produto.findOne({
            where: { codigo: produtoCodigo },
        })

        if (!produto) {
            return res.status(404).render("error", { mensagem: 'Produto não encontrado.' });
        }

        const valorTotal = produto.preco * quantidade;

        await ItemPedido.create({
            Usuario_codigo: usuarioCodigo,
            Estoque_codigo: estoque.codigo,
            quantidadeTotal: quantidade,
            valorTotal: valorTotal,
            concluido: false,
        })

        res.status(201).render("success", { mensagem: "Produto adicionado no carrinho" })
    } catch (erro) {
        res.status(500).render("error", { mensagem: `${erro}` })
    }
}

const listarCarrinho = async (req, res) => {
    try {
        const { usuarioCodigo } = req.params;

        const itensCarrinho = await ItemPedido.findAll({
            where: { Usuario_codigo: usuarioCodigo, concluido: false },
            include: [
                {
                    model: Estoque,
                    include: [{ model: Produto }],
                },
            ],
        });

        res.render('carrinho', { itensCarrinho });
    } catch (erro) {
        res.status(500).render("error", { mensagem: `${erro}` })
    }
}

const concluirCarrinho = async (req, res) => {
    try {
        const { itensCodigo } = req.body;

        const itensCarrinho = await ItemPedido.findAll({
            where: { codigo: itensCodigo },
            include: [
                {
                    model: Estoque,
                },
            ],
        });

        for (const item of itensCarrinho) {
            const estoque = await Estoque.findOne({
                where: { codigo: item.Estoque_codigo },
            });

            if (!estoque || estoque.quantidade < item.quantidadeTotal) {
                return res.status(400).render("error", {
                    mensagem: `Estoque insuficiente para o item: ${item.Estoque_codigo}`,
                });
            }

            await Estoque.update(
                { quantidade: estoque.quantidade - item.quantidadeTotal },
                { where: { codigo: item.Estoque_codigo } }
            );
        }

        await ItemPedido.update(
            { concluido: true },
            { where: { codigo: itensCodigo } }
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
}