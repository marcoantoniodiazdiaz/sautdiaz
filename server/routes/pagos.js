const express = require('express');
const _ = require('underscore');

const Pagos = require('../models/pagos.model');


const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/pagos', verificaToken, (req, res) => {
    Pagos.find({}).exec((err, data) => {
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

app.get('/pagos/:servicio', verificaToken, (req, res) => {

    let servicio = req.params['servicio'];

    Pagos.find({
        servicio
    }).exec((err, data) => {
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

app.post('/pagos', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let data = new Pagos({
        cantidad: body.cantidad,
        fecha: body.fecha,
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