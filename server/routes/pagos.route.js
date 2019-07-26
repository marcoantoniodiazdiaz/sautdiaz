const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Pagos = require('../models/pagos.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/pagos', [verificaToken, verificaAdmin_Role], (req, res) => {
    Pagos.find({})
        .populate('movimiento')
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

// MOSTRAR PAGOS POR SERVICIO
app.get(
    '/pagos/servicio/:id', [verificaToken, verificaAdmin_Role],
    (req, res) => {
        let servicio = req.params.id;

        Pagos.find({
                servicio
            })
            .populate('movimiento')
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
    }
);

app.post('/pagos', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let pagos = new Pagos({
        movimiento: body.movimiento,
        servicio: body.servicio
    });

    pagos.save((err, data) => {
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

app.put('/pagos/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['movimiento', 'servicio']);

    Pagos.findByIdAndUpdate(
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
                data
            });
        }
    );
});

app.delete('/pagos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Pagos.find({ _id: id })
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
                data
            });
        });
});

module.exports = app;