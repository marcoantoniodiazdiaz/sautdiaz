const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Clientes = require('../models/clientes.model');
const {
    verificaToken,
    verificaAdmin_Role
} = require('../middlewares/autenticacion');

const app = express();

app.get('/clientes', [verificaToken], (req, res) => {
    Clientes.find({})
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

app.get('/clientes/nombre/:nombre', [verificaToken], (req, res) => {
    let nombre = req.params.nombre;
    let regex = new RegExp(nombre);

    Clientes.find({
            nombre: {
                $regex: regex
            }
        })
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

app.post('/clientes', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    console.log(body);

    let clientes = new Clientes({
        nombre: body.nombre,
        calle: body.calle,
        numero: body.numero,
        colonia: body.colonia,
        email: body.email,
        telefono: body.telefono
    });

    clientes.save((err, data) => {
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

app.put('/clientes/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'calle',
        'numero',
        'colonia',
        'email',
        'telefono'
    ]);

    Clientes.findByIdAndUpdate(
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
                data: data
            });
        }
    );
});

app.delete('/clientes/:id', [verificaToken, verificaAdmin_Role], function(
    req,
    res
) {
    let id = req.params.id;

    Clientes.find({ _id: id })
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

// Activar Cliente
app.put(
    '/clientes/activate/:telefono', [verificaToken, verificaAdmin_Role],
    function(req, res) {
        let telefono = req.params.telefono;
        let body = _.pick(req.body, ['password', 'activated']);

        if (body.password == [] || body.password == null) {
            return res.status(400).json({
                ok: false,
                err: 'Error al activar, datos no validos'
            });
        }

        let encypted = bcrypt.hashSync(body.password, 10);

        body.password = encypted;

        Clientes.findOneAndUpdate({
                telefono,
                activated: false
            },
            body, { new: true, runValidators: true },
            (err, data) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                if (!data) {
                    return res.status(400).json({
                        ok: false,
                        err: 'El cliente ya esta activo o no existe'
                    });
                }

                res.json({
                    ok: true,
                    data: data
                });
            }
        );
    }
);

module.exports = app;