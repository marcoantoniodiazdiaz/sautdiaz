const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Vehiculos = require('../models/vehiculos.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/vehiculos', verificaToken, (req, res) => {
    Vehiculos.find({})
        .populate('cliente')
        .populate('marca')
        .exec((err, data) => {
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

app.get('/vehiculos/cliente/:cliente', verificaToken, (req, res) => {
    let cliente = req.params.cliente;

    Vehiculos.find({
            cliente
        })
        .populate('cliente')
        .populate('marca')
        .exec((err, data) => {
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

app.post('/vehiculos', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let vehiculos = new Vehiculos({
        placa: body.placa,
        marca: body.marca,
        submarca: body.submarca,
        color: body.color,
        modelo: body.modelo,
        cliente: body.cliente,
        motor: body.motor
    });

    vehiculos.save((err, vehiculos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            vehiculos
        });
    });
});

app.put('/vehiculos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'placa',
        'marca',
        'submarca',
        'color',
        'modelo',
        'cliente',
        'motor'
    ]);

    Vehiculos.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                vehiculo: data
            });
        }
    );
});

app.delete('/vehiculos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Vehiculos.find({ _id: id })
        .remove()
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                vehiculo: data
            });
        });
});

module.exports = app;