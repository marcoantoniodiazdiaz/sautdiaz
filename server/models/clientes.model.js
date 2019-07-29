const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let clientesSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },
    calle: {
        type: String
    },
    numero: {
        type: String
    },
    colonia: {
        type: String
    },
    email: {
        type: String
    },
    telefono: {
        type: String,
        required: [true, 'El campo telefono es requerido']
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    password: {
        type: String,
        default: 'default'
    },
    activated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Clientes', clientesSchema);