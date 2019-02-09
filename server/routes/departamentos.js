const express = require('express');
const _ = require('underscore');

const Departamentos = require('../models/departamentos.model');


const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/departamentos', verificaToken, (req, res) => {
    Departamentos.find({}).exec((err, data) => {
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

app.post('/departamentos', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let data = new Departamentos({
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