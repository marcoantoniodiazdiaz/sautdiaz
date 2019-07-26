const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Departamentos = require('../models/departamentos.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/departamentos', verificaToken, (req, res) => {
    Departamentos.find({}).exec((err, data) => {
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

app.post('/departamentos', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let body = req.body;

    let departamentos = new Departamentos({
        nombre: body.nombre
    });

    departamentos.save((err, departamentos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            departamentos
        });
    });
});

app.put('/departamentos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Departamentos.findByIdAndUpdate(
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

app.delete('/departamentos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Departamentos.find({ _id: id })
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