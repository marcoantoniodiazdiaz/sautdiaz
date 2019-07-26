const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Marcas = require('../models/marcas.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/marcas', [verificaToken, verificaAdmin_Role], (req, res) => {
    Marcas.find({})
        .sort({
            nombre: 1
        })
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

app.post('/marcas', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let marcas = new Marcas({
        nombre: body.nombre
    });

    marcas.save((err, marcas) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            marcas
        });
    });
});

app.put('/marcas/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Marcas.findByIdAndUpdate(
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
                marcas: data
            });
        }
    );
});

app.delete('/marcas/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Marcas.find({ _id: id })
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
                marcas: data
            });
        });
});

module.exports = app;