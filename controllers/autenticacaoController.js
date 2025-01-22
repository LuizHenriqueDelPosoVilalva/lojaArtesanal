const { Usuario } = require('../models');

const autenticar = (req, res) => {
    try {
        res.render("forms/login")
    } catch(erro) {
        res.status(500).render({mensagem: erro.message})
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(403).render('error', { mensagem: 'Senha e email são obrigatórios' });
        }

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(403).render('error', { mensagem: 'Usuario não encontrado' });
        }

        if (usuario.senha !== senha) {
            return res.status(403).render('error', { mensagem: 'Senha invalida' });
        }

        req.session.usuario = {
            codigo: usuario.codigo,
            nome: usuario.nome,
            email: usuario.email,
            cargo: usuario.cargo
        }

        res.redirect('/');
    } catch (error) {
        throw new Error(`${error}`)
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
