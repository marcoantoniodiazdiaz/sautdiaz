const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Trabajadores = require('../models/trabajadores.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/trabajadores', verificaToken, (req, res) => {
    Trabajadores.find({}).exec((err, data) => {
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

app.post('/trabajadores', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let body = req.body;

    let trabajadores = new Trabajadores({
        nombre: body.nombre
    });

    trabajadores.save((err, trabajadores) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            trabajadores
        });
    });
});

app.put('/trabajadores/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Trabajadores.findByIdAndUpdate(
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
                trabajador: data
            });
        }
    );
});

app.delete('/trabajadores/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Trabajadores.find({ _id: id })
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
                trabajador: data
            });
        });
});

module.exports = app;