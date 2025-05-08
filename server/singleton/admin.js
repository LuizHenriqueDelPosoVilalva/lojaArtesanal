class AdminSession {
    constructor() {
        if (AdminSession.instance) {
            return AdminSession.instance
        }
        this.currentAdmin = null
        AdminSession.instance = this
    }

    logarAdmin(admin) {
        if (this.currentAdmin) {
            throw new Error('Já existe um administrador autenticado!');
        }
        this.currentAdmin = admin
    }

    deslogarAdmin() {
        this.currentAdmin = null
    }

    getAdminLogado() {
        return this.currentAdmin
    }
}

const instance = new AdminSession()

module.exports = new AdminSession()