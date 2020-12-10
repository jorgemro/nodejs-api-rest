const uploadDeArquivo = require('../infraestrutura/arquivos/uploadDeArquivos')
const repositorio = require('../repositorios/pets')

class Pet {
    adicionaPet(pet) {
        
        return uploadDeArquivo(pet.imagem, pet.nome)
        .then(novoCaminho => {
            const novoPet = {nome: pet.nome, imagem: novoCaminho}
            return repositorio.adiciona(novoPet).then(resultados => {
                const id = resultados.insertId
                return ({...novoPet, id})
            })
        })
    }
}

module.exports = new Pet()