const express = require('express');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(require('./usuario'));
app.use(require('./vehiculos'));
app.use(require('./servicios'));
app.use(require('./departamentos'));
app.use(require('./login'));
app.use(require('./productos'));
app.use(require('./trabajadores'));
app.use(require('./detalle'));
app.use(require('./marcas'));
app.use(require('./pagos'));
app.use(require('./colores'));
app.use(require('./updates'));



module.exports = app;