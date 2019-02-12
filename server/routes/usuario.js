const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario.model');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/usuario', verificaToken, (req, res) => {

    Usuario.find({ role: 'USER_ROLE' })
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuarios,
            });
        });
});

app.post('/usuario', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        direccion: body.direccion,
        telefono: body.telefono,
        celular: body.celular
    });


    usuario.save((err, usuarioDB) => {

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


    });


});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'direccion', 'telefono', 'celular']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, data) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        res.json({
            ok: true,
            usuario: data
        });

    })

});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params['id'];

    Usuario.findOneAndDelete({ _id: id }, function(err, data) {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (data === null) {
            return res.status(400).json({
                ok: false,
                message: "El cliente no existe en el servicio"
            })
        }

        res.json({
            ok: true,
            data
        });
    })
});



module.exports = app;