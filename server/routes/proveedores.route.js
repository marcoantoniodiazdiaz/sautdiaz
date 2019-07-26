const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Proveedores = require('../models/provedoores.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/proveedores', [verificaToken, verificaAdmin_Role], (req, res) => {
    Proveedores.find({}).exec((err, data) => {
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

app.post('/proveedores', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let body = req.body;

    let proveedores = new Proveedores({
        nombre: body.nombre
    });

    proveedores.save((err, proveedores) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            proveedores
        });
    });
});

app.put('/proveedores/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Proveedores.findByIdAndUpdate(
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
                proveedores: data
            });
        }
    );
});

app.delete('/proveedores/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Proveedores.find({ _id: id })
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
                proveedores: data
            });
        });
});

module.exports = app;