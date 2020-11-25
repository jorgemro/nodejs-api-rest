const atendimento = require('../models/atendimentos');


module.exports = app => {
    app.get('/atendimentos', (req, res) => 
        res.send("você esta na rota de atendimento GET."));

    app.post('/atendimentos', (req, res) => {
        
        atendimento.adiciona(req.body);
        res.send("você esta acessando a rota atendimento via POST.")
    });
        
}