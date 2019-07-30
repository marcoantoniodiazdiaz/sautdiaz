const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Movimientos = require('../models/movimientos.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/movimientos', [verificaToken, verificaAdmin_Role], (req, res) => {
    /*
                    Cuentas:
                    0: Caja
                    1: Bancos
                    2: Proveedores
                    3: Clientes
                    4. Mercancias
                    5. Doc por pagar
                    6. Doc por cobrar

                */

    Movimientos.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        let total = 0.0;
        for (let i = 0; i < data.length; i++) {
            total += +data[i].cantidad;
        }

        res.json({
            ok: true,
            data,
            total
        });
    });
});

// CAJA
app.get(
    '/movimientos/:cuenta/:start/:end', [verificaToken, verificaAdmin_Role],
    (req, res) => {
        cuenta = req.params.cuenta;
        start = req.params.start;
        end = req.params.end;

        /*
                       Cuentas:
                       0: Caja
                       1: Bancos
                       2: Proveedores
                       3: Clientes
                       4. Mercancias
                       5. Doc por pagar
                       6. Doc por cobrar

                   */

        Movimientos.find({
            cuenta,
            fecha: {
                $gte: start,
                $lte: end
            }
        }).exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            let total = 0.0;
            for (let i = 0; i < data.length; i++) {
                total += +data[i].cantidad;
            }

            res.json({
                ok: true,
                data,
                total
            });
        });
    }
);

app.post('/movimientos', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    /*
                    Cuentas:
                    0: Caja
                    1: Bancos
                    2: Proveedores
                    3: Clientes
                    4. Mercancias
                    5. Doc por pagar
                    6. Doc por cobrar

                */

    let body = req.body;

    let movimientos = new Movimientos({
        fecha: new Date().toISOString(),
        cantidad: body.cantidad,
        cuenta: body.cuenta,
        descripcion: body.descripcion,
        hidden: body.hidden
    });

    movimientos.save((err, data) => {
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

app.put('/movimientos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;
    let body = _.pick(req.body, ['cantidad', 'cuenta', 'descripcion']);

    Usuario.findByIdAndUpdate(
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

app.delete('/movimientos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    id = req.params.id;
    Movimientos.find({
            _id: id
        })
        .remove((err, data) => {
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
        })
        .exec();
});

module.exports = app;