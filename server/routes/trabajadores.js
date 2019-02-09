const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Trabajadores = require('../models/trabajadores.model');


const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/trabajadores', verificaToken, (req, res) => {
    Trabajadores.find({}).exec((err, data) => {
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

app.post('/trabajadores', [verificaToken, verificaAdmin_Role], function(req, res) {

    let body = req.body;

    let data = new Trabajadores({
        nombre: body.nombre
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




module.exports = app;