const atendimento = require('../models/atendimentos');


module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        atendimento.lista()
        .then(resultados => res.json(resultados))
        .catch(erro => res.status(400).json(erro))
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimento.buscaPorId(id)
        .then(resultados => res.json(resultados))
        .catch(erro => res.status(400).json(erro))
    });

    app.post('/atendimentos', (req, res) => {
        const atendimentoReq = req.body
        atendimento.adiciona(atendimentoReq)
        .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
        .catch(erro => res.status(400).json(erro))
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        atendimento.altera(id, valores)
        .then(resultados => res.json(resultados))
        .catch(erro => res.status(400).json(erro))
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        atendimento.deleta(id)
        .then(() => res.status(200).json(id))
        .catch(erro => res.status(400).json(erro));
    });
        
}