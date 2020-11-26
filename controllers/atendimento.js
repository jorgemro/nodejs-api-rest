const atendimento = require('../models/atendimentos');


module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        atendimento.lista(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimento.buscaPorId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        atendimento.adiciona(req.body, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        atendimento.altera(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        atendimento.deleta(id, res);
    });
        
}