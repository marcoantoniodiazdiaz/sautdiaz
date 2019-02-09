const express = require('express');
const _ = require('underscore');

const Detalle = require('../models/detalle.model');


const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/detalle/:servicio', verificaToken, (req, res) => {

    let servicio = req.params.servicio

    Detalle.find({
            servicio
        })
        .populate('producto')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            let total = 0;
            for (let i in data) {
                total += (+data[i]['producto']['precio']) * (+data[i]['cantidad']);
            }

            res.json({
                ok: true,
                data,
                total
            });
        })
});

app.post('/detalle', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let data = new Detalle({
        producto: body.producto,
        cantidad: body.cantidad,
        servicio: body.servicio
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