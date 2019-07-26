const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Ventas = require('../models/venta.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/ventas', [verificaToken, verificaAdmin_Role], (req, res) => {
    Ventas.find({})
        .populate({
            path: 'producto'
        })
        .populate('servicio')
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

app.get(
    '/ventas/servicio/:servicio', [verificaToken, verificaAdmin_Role],
    (req, res) => {
        let servicio = req.params.servicio;

        Ventas.find({
                servicio: servicio
            })
            .populate('producto')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                let total = 0;
                let mo = 0;
                let totalCompra = 0;

                for (let i = 0; i < data.length; i++) {
                    total += +data[i]['producto']['precio'] * +data[i]['cantidad'];
                    totalCompra += +data[i]['producto']['compra'] * +data[i]['cantidad'];

                    if (
                        data[i]['producto']['departamento'] == '5d15130f3db192098e178ed0'
                    ) {
                        mo += +data[i]['producto']['precio'] * +data[i]['cantidad'];
                    }
                }

                res.json({
                    ok: true,
                    data,
                    total,
                    mo,
                    totalCompra
                });
            });
    }
);

app.post('/ventas', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let ventas = new Ventas({
        producto: body.producto,
        cantidad: body.cantidad,
        servicio: body.servicio
    });

    ventas.save((err, ventas) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ventas
        });
    });
});

app.delete('/ventas/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    console.log(id);

    Ventas.find({ _id: id })
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
                cliente: data
            });
        });
});

module.exports = app;