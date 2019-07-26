const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Clientes = require('../models/clientes.model');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    if (!body.telefono || !body.password) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Datos incompletos para el inicio de sesion'
            }
        });
    }

    Clientes.findOne({ telefono: body.telefono }, (err, data) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!data) {
            return res.status(400).json({
                ok: false,
                err: {
                    // message: '(Usuario) o contraseña incorrectos'
                    message: 'Este telefono no corresponde a ningun cliente registrado'
                }
            });
        }

        if (!data.activated) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario esta desactivado'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, data.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La contraseña es incorrecta'
                }
            });
        }

        let token = jwt.sign({
                usuario: data
            },
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
        );

        res.json({
            ok: true,
            data,
            token
        });
    });
});

module.exports = app;