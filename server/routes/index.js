const express = require('express');
var cors = require('cors');

const app = express();

/*app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
});*/
app.use(cors());
app.options('*', cors());

app.use(require('./clientes.route'));
app.use(require('./marcas.route'));
app.use(require('./vehiculos.route'));
app.use(require('./servicios.route'));
app.use(require('./departamentos.route'));
app.use(require('./productos.route'));
app.use(require('./ventas.route'));
app.use(require('./movimientos.route'));
app.use(require('./contabilidad.route'));
app.use(require('./trabajadores.route'));
app.use(require('./proveedores.route'));
app.use(require('./pagos.route'));
app.use(require('./venta-mostrador.route'));
app.use(require('./mostrador.route'));
app.use(require('./login'));

module.exports = app;