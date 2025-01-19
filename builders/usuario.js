const { Usuario } = require('../models');

class UsuarioBuilder {
    constructor() {
        this.usuario = {}
    }

    setNome(nome) {
        this.usuario.nome = nome
        return this
    }

    setEmail(email) {
        this.usuario.email = email
        return this
    }

    setTelefone(telefone) {
        this.usuario.telefone = telefone
        return this
    }

    setCpf(cpf) {
        this.usuario.cpf = cpf
        return this
    }

    setEndereco(endereco) {
        this.usuario.endereco = endereco
        return this
    }

    setNumero(numero) {
        this.usuario.numero = numero
        return this
    }

    setCidade(cidade) {
        this.usuario.cidade = cidade
        return this
    }

    setDataDeNascimento(dataDeNascimento) {
        this.usuario.dataDeNascimento = dataDeNascimento
        return this
    }

    setSenha(senha) {
        this.usuario.senha = senha
        return this
    }

    setAcesso(acesso) {
        this.usuario.acesso = acesso
        return this
    }

    setCargo(cargo) {
        this.usuario.cargo = cargo
        return this
    }

    validador() {
        const errors = [];

        if (!this.usuario.nome || this.usuario.nome.trim().length === 0) {
            errors.push('Nome é obrigatório')
        }

        if (!this.usuario.email || !/^\S+@\S+\.\S+$/.test(this.usuario.email)) {
            errors.push('Email inválido')
        }

        if (!this.usuario.cpf || this.usuario.cpf.length !== 11) {
            errors.push('CPF inválido')
        }

        if (!this.usuario.telefone || this.usuario.telefone.length < 10) {
            errors.push('Telefone inválido');
        }

        if (!this.usuario.senha || this.usuario.senha.length < 6) {
            errors.push('A senha deve ter pelo menos 6 caracteres');
        }

        if (!this.usuario.cidade || this.usuario.cidade.trim().length === 0) {
            errors.push('Cidade é obrigatória');
        }

        if (!this.usuario.endereco || this.usuario.endereco.trim().length === 0) {
            errors.push('Endereço é obrigatório');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        return true
    }

    async save() {
        try {
            this.validate()
            return await Usuario.create(this.usuario);
        } catch (error) {
            throw new Error(`Erro ao salvar usuário: ${error.message}`);
        }
    }
}

module.exports = {
    UsuarioBuilder
}
