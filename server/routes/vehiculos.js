const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario.model');
const Vehiculos = require('../models/vehiculos.model');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/vehiculos', verificaToken, (req, res) => {

    Vehiculos.find({})
        .populate('cliente')
        .populate('marca')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                data
            });
        });
});

app.get('/vehiculos/:id', verificaToken, (req, res) => {
    let cliente = req.params['id'];
    Vehiculos.find({
            cliente
        })
        .populate('cliente')
        .populate('marca')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                data
            });
        });
});

app.post('/vehiculos', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let vehiculos = new Vehiculos({
        placa: body.placa,
        marca: body.marca,
        submarca: body.submarca,
        color: body.color,
        cliente: body.cliente
    });


    vehiculos.save((err, vehiculo) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            vehiculo
        });


    });


});

app.put('/vehiculos/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

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

    })

});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {


    let id = req.params.id;


    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



});



module.exports = app;