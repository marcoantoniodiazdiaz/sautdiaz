const express = require('express');
const _ = require('underscore');

const Marcas = require('../models/marcas.model');


const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/marcas', verificaToken, (req, res) => {
    Marcas.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            data
        });
    })
});

app.post('/marcas', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let data = new Marcas({
        nombre: body.nombre,
    });

    data.save((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data
        });
    });


});



module.exports = app;