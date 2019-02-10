const express = require('express');
const _ = require('underscore');

const Updates = require('../models/updates.model');


const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();


app.get('/updates', verificaToken, (req, res) => {
    Updates.find({}).exec((err, data) => {
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

module.exports = app;