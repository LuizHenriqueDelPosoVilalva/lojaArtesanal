const { UsuarioBuilder } = require("../builders/usuario")



const cadastrar = async (req, res) => {
    try {
        const cargo = req.params.cargo
        const { nome, email, telefone, cpf, endereco, numero, cidade, dataDeNascimento, senha, acesso } = req.body;

        await new UsuarioBuilder()
            .setNome(nome)
            .setEmail(email)
            .setTelefone(telefone)
            .setCpf(cpf)
            .setEndereco(endereco)
            .setNumero(numero)
            .setCidade(cidade)
            .setDataDeNascimento(dataDeNascimento)
            .setSenha(senha)
            .setAcesso(acesso)
            .setCargo(cargo)
            .save();

        res.status(201).render("success", { mensagem: "Usuario Cadastrado Com Sucesso" });
    } catch (error) {
        res.status(400).render('error', { error: error.message });
    }
}


module.exports = {
    cadastrarCliente
}