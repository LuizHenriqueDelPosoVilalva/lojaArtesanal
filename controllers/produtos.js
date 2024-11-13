const listarProdutos = (req, res) => {
    res.render("home")
}

const produto = (req, res) => {
    const titulo = req.params.titulo
    res.render("produto", {titulo:titulo})
}

const buscarProduto = (req,res) => {
    const titulo = req.query.titulo
    res.render("produtoBuscado", {titulo:titulo})
}

module.exports = {
    listarProdutos,
    produto,
    buscarProduto
}