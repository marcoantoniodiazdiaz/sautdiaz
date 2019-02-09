const express = require('express');
const _ = require('underscore');

const Colores = require('../models/colores.model');


const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/colores', verificaToken, (req, res) => {
    Colores.find({}).exec((err, data) => {
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

app.post('/colores', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let data = new Colores({
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