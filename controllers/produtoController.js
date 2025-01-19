const {Produto, Estoque} = require('../models')

const listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll()
        res.render("home", { produtos: produtos })

    } catch (error) {
        res.render("home", { produtos: [] })
        throw new Error()
    }
}

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
            imagem
        });

        await Estoque.create({
            Produto_codigo: produto.codigo,
            quantidade: quantidadeEstoque,
            dataDeEntrada: new Date()
        })

        res.status(201).render("success", {mensagem:"Produto Cadastrado com Sucesso"})

    } catch (error) {
        res.status(500).render("error", {mensagem: "Erro no servidor, tente mais tarde"})
        throw new Error()
    }
};

const criar = (req, res) => {
    console.log("Chegou aqui")
    res.render("./forms/produto")
}

const editar = async (req, res) => {
    try {
        const { codigo } = req.params;

        const produto = await Produto.findOne({
            where: { codigo },
            include: {
                model: Estoque,
                required: false 
            }
        });

        if (!produto) {
            res.status(404).render("error", { mensagem: "Produto não encontrado" });
            return;
        }

        const estoque = produto.Estoques ? produto.Estoques[0] : null;

        res.render("./forms/editarProduto", { produto, estoque });
    } catch (error) {
        res.status(500).render("error", { mensagem: "Erro ao buscar produto para edição" });
        throw new Error();
    }
};


const atualizar = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { nome, descricao, preco, imagem, quantidadeEstoque } = req.body;

        const produto = await Produto.findOne({ where: { codigo } });

        if (!produto) {
            res.status(404).render("error", { mensagem: "Produto não encontrado" });
            return;
        }

        await produto.update({
            nome,
            descricao,
            preco,
            imagem
        });

        if (quantidadeEstoque !== undefined) {
            let estoque = await Estoque.findOne({ where: { Produto_codigo: codigo } });

            if (estoque) {
                await estoque.update({
                    quantidade: quantidadeEstoque,
                    updatedAt: new Date()
                });
            } else {
                await Estoque.create({
                    Produto_codigo: codigo,
                    quantidade: quantidadeEstoque,
                    dataDeEntrada: new Date()
                });
            }
        }

        res.status(200).render("success", { mensagem: "Produto e estoque atualizados com sucesso!" });

    } catch (error) {
        res.status(500).render("error", { mensagem: "Erro ao atualizar produto" });
        throw new Error();
    }
}



const excluir = async (req, res) => {
    try {
        const { codigo } = req.params

        const produto = await Produto.findOne({ where: { codigo } });

        if (!produto) {
            res.status(404).render("error", { mensagem: "Produto não encontrado" });
            return;
        }

        await produto.destroy()

        res.status(200).render("success", { mensagem: "Produto excluído com sucesso!" });
    } catch (error) {
        res.status(500).render("error", { mensagem: "Erro ao excluir produto" });
        throw new Error();
    }
};

module.exports = {
    listar,
    cadastrar,
    criar,
    editar,
    atualizar,
    excluir
}




