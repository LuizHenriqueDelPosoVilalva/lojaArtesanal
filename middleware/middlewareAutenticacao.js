const middlewareAutenticacao = (cargosPermitidos) => {
    return (req, res, next) => {
        try {
            if (!req.session || !req.session.usuario) {
                throw new Error("Você precisa estar autenticado para acessar esta funcionalidade.");
            }

            const { cargo } = req.session.usuario;

            if (!cargosPermitidos.includes(cargo)) {
                throw new Error("Você não tem permissão para acessar esta funcionalidade.");
            }

            next()
        } catch (error) {
            res.status(403).render('error', { mensagem: error.message });
        }
    }
}

module.exports = {middlewareAutenticacao}
