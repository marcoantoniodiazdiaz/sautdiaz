const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let proveedores = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    }
});

module.exports = mongoose.model('Proveedores', proveedores);