const pet = require('../models/pets')

module.exports = app => {
    app.post('/pet', (req, res) => {
        pet.adicionaPet(req.body)
        .then(resultados => res.json(resultados))
        .catch(erro => res.status(400).json(erro))
    });
}