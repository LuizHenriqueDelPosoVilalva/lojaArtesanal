const {Produto} = require('../models')

const listar = async (req, res) => {
    try {
        console.log("chegou em listar")
        const produtos = await Produto.findAll()
        console.log(produtos)
        res.render("home", { produtos: produtos })

    } catch (error) {
        res.render("home", { produtos: [] })
        throw new Error
    }
}

const cadastrar = async (req, res) => {
    try {
        console.log(req.body)
        const { nome, descricao, preco, imagem } = req.body;

        await Produto.create({
            nome,
            descricao,
            preco,
            imagem
        });
        console.log("produto cadastrado")

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar produto');
    }
};

module.exports = {
    listar,
    cadastrar
}




