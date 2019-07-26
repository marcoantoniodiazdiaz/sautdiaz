const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Productos = require('../models/productos.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/productos', verificaToken, (req, res) => {
    Productos.find({
            codigo: {
                $not: {
                    $lte: 0,
                    $lte: 1
                }
            }
        })
        .sort({
            nombre: 1
        })
        .populate('departamento')
        .exec((err, data) => {
            // console.log(data);

            let compra = 0;
            let venta = 0;

            data.forEach(producto => {
                compra += +producto['compra'] * +producto['existencia'];
                venta += +producto['precio'] * +producto['existencia'];
            });

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                data,
                compra,
                venta
            });
        });
});

// BUSCAR POR ID
app.get('/productos/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    // console.log(id);

    Productos.findById(id)
        .populate('departamento')
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
    '/productos/nombre/:nombre', [verificaToken, verificaAdmin_Role],
    (req, res) => {
        let nombre = req.params.nombre;
        let regex = new RegExp(nombre);

        Productos.find({
                nombre: {
                    $regex: regex
                },
                codigo: {
                    $not: {
                        $lte: 0,
                        $lte: 1
                    }
                }
            })
            .limit(5)
            .populate('departamento')
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

app.post('/productos', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let productos = new Productos({
        nombre: body.nombre,
        codigo: body.codigo,
        departamento: body.departamento,
        precio: body.precio,
        compra: body.compra,
        existencia: body.existencia
    });

    productos.save((err, productos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productos
        });
    });
});

app.put('/productos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    console.log(id);

    let body = _.pick(req.body, [
        'nombre',
        'codigo',
        'departamento',
        'precio',
        'compra',
        'existencia'
    ]);

    Productos.findByIdAndUpdate(
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
                producto: data
            });
        }
    );
});

app.delete('/productos/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Productos.find({ _id: id })
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
                producto: data
            });
        });
});

// EDITAR CANTIDAD
app.put(
    '/productos/existencia/:id', [verificaToken, verificaAdmin_Role],
    function(req, res) {
        let id = req.params.id;
        let body = _.pick(req.body, ['existencia']);

        Productos.findByIdAndUpdate(
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
                    producto: data
                });
            }
        );
    }
);

module.exports = app;