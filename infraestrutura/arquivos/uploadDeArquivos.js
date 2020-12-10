const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

module.exports = (caminho, nomeDoArquivo) => {
    return new Promise((resolve, reject) => {
        const tiposValidos = ['jpg', 'png', 'jpeg']
        const tipo = path.extname(caminho)
        const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !==  -1
        
        if (tipoEhValido) {  
            const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`
        
            fs.createReadStream(caminho)
                .pipe(fs.createWriteStream(novoCaminho))
                .on('finish', () => resolve(novoCaminho))
        }else {
            const erro = 'O tipo é invalido'
            reject({ erro: erro })
        }
    })
}
