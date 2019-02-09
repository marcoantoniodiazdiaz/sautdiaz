const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Servicios = require('../models/servicios.model');


const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/servicios', verificaToken, (req, res) => {
    Servicios.find({})
        .populate({
            path: 'vehiculo',
            populate: {
                path: 'marca',
                model: 'Marcas'
            }
        })
        .populate({
            path: 'vehiculo',
            populate: {
                path: 'cliente',
                model: 'Usuario'
            }
        })
        .populate('trabajador')
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
        })
});

app.post('/servicios', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let data = new Servicios({
        cliente: body.cliente,
        vehiculo: body.vehiculo,
        fecha: body.fecha,
        trabajador: body.trabajador
    });


    data.save((err, data) => {

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