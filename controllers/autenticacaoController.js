const { Usuario } = require('../models')
const AdminSession = require('../singleton/admin')

const autenticar = (req, res) => {
    try {
        res.render("forms/login")
    } catch (erro) {
        res.status(500).render("error", { mensagem: erro.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(403).render('error', { mensagem: 'Senha e email são obrigatórios' })
        }

        const usuario = await Usuario.findOne({ where: { email } })

        if (!usuario) {
            return res.status(403).render('error', { mensagem: 'Usuario não encontrado' })
        }

        if (usuario.senha !== senha) {
            return res.status(403).render('error', { mensagem: 'Senha invalida' })
        }

        if (!usuario.acesso) {
            return res.status(403).render('error', { mensagem: 'Acesso negado. Seu acesso está desativado.' })
        }

        if (usuario.cargo === 'administrador') {
            try {
                AdminSession.logarAdmin(usuario)
            } catch (erro) {
                return res.status(403).render('error', { mensagem: erro.message })
            }
        }

        req.session.usuario = {
            codigo: usuario.codigo,
            nome: usuario.nome,
            email: usuario.email,
            cargo: usuario.cargo
        }

        res.redirect('/')
    } catch (erro) {
        res.status(500).render("error", { mensagem: erro.message })
    }
}

const logout = (req, res) => {
    try {
        if (req.session.usuario && req.session.usuario.cargo === 'administrador') {
            AdminSession.deslogarAdmin()
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).render('error', { mensagem: 'Erro ao encerrar a sessão.' })
            }
            res.redirect('/')
        })
    } catch (erro) {
        return res.status(403).render('error', { mensagem: erro.message })
    }
}

module.exports = {
    login,
    logout,
    autenticar
}
