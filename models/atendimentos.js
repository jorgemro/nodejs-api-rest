const conexao = require('../infraestrutura/database/conexao')
const moment = require('moment');
const axios = require('axios');
const repositorio = require('../repositorios/atendimentos')

class Atendimento {
    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = ({ tamanho }) => tamanho >= 5
        this.valida = parametros => this.Validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })
        this.Validacoes = [
            {
                "nome": "data",
                "valido": this.dataEhValida,
                "mensagem": "Data deve ser maior ou igual a data atual"
            },
            {
                "nome": "cliente",
                "valido": this.clienteEhValido,
                "mensagem": "Cliente deve ter pelo menos 5 caracteres"
            }
        ]
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
       
        const parametros = {
            data: {data, dataCriacao },
            cliente: {tamanho: atendimento.cliente.length}
        }
        
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if(existemErros) {
            return new Promise((resolve, reject) => {
                reject(erros)
            }) 
        }else {
            const atendimentoDatado = {...atendimento,  dataCriacao, data}

            return repositorio.adiciona(atendimentoDatado).then(resultados => {
                const id  = resultados.insertId
                return { ...atendimento, id }
            })
        }
    }

    lista() {
        return repositorio.lista()
    }

    buscaPorId(id) {
        return repositorio.buscaPorId(id).then(async resultados => {
            const atendimento = resultados[0]
            const cpf = atendimento.cliente

            const { data } = await axios.get(`http://localhost:8082/${cpf}`)
            atendimento.cliente = data.nome
            
            resultados[0] = atendimento
            return resultados
        })
    }

    altera(id, valores) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        
        return repositorio.altera(id, valores).then( () => {
                return this.buscaPorId(id)
            })
    }

    deleta(id) {
        return repositorio.deleta(id)
    }
}

module.exports = new Atendimento;