const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Servicios = require('../models/servicios.model');
const Pagos = require('../models/pagos.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/servicios', verificaToken, (req, res) => {
    Servicios.find({})
        .sort({
            fecha: -1
        })
        .populate({
            path: 'vehiculo',
            populate: {
                path: 'cliente'
            }
        })
        .populate({
            path: 'vehiculo',
            populate: {
                path: 'marca'
            }
        })
        .populate({
            path: 'trabajador'
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

app.get('/servicios/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Servicios.find({
            _id: id
        })
        .populate({
            path: 'vehiculo',
            populate: {
                path: 'cliente'
            }
        })
        .populate({
            path: 'vehiculo',
            populate: {
                path: 'marca'
            }
        })
        .populate({
            path: 'trabajador'
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

app.post('/servicios', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let servicios = new Servicios({
        fecha: new Date().toISOString(),
        vehiculo: body.vehiculo,
        estado: body.estado,
        trabajador: body.trabajador
    });

    servicios.save((err, servicios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            servicios
        });
    });
});

app.put('/servicios/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;
    let body = _.pick(req.body, ['vehiculo', 'trabajador', 'estado']);

    Servicios.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    );
});

app.delete('/servicios/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Servicios.find({ _id: id })
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
                servicio: data
            });
        });
});

module.exports = app;