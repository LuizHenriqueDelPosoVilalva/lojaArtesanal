const { Usuario } = require('../models');

const autenticar = (req, res) => {
    try {
        console.log("Chegou")
        res.render("forms/login")
    } catch(erro) {
        res.status(500).render({mensagem: erro.message})
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            throw new Error("Email e senha são obrigatórios.");
        }

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }


        if (usuario.senha !== senha) {
            throw new Error("Credenciais inválidas.");
        }

        req.session.usuario = {
            codigo: usuario.codigo,
            nome: usuario.nome,
            email: usuario.email,
            cargo: usuario.cargo
        };

        res.status(200).render('success', { mensagem: "Login realizado com sucesso." });
    } catch (error) {
        console.error("Erro no login:", error.message);
        res.status(401).render('error', { mensagem: error.message });
    }
};

const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).render('error', { mensagem: 'Erro ao encerrar a sessão.' });
            }
            res.redirect('/');
        });
    } catch(erro) {
        console.error('Erro ao encerrar a sessão:', err);
        return res.status(500).render('error', { mensagem: 'Erro ao encerrar a sessão.' });
    } 
};

module.exports = {
    login,
    logout,
    autenticar
}
