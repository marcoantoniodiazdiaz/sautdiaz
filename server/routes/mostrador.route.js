const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Mostrador = require('../models/mostrador.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/mostrador', verificaToken, (req, res) => {
    Mostrador.find({})
        .sort({
            fecha: -1
        })
        .populate({
            path: 'cliente'
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

app.get('/mostrador/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Mostrador.find({
            _id: id
        })
        .populate({
            path: 'cliente'
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

app.post('/mostrador', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let mostrador = new Mostrador({
        fecha: new Date().toISOString()
            // cliente: body.cliente
    });

    mostrador.save((err, data) => {
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

app.delete('/mostrador/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Mostrador.find({ _id: id })
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