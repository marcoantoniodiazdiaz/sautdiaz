const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let clientesSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido']
    },
    calle: {
        type: String,
        required: [true, 'El campo calle es requerido']
    },
    numero: {
        type: String,
        required: [true, 'El campo numero de calle es requerido']
    },
    colonia: {
        type: String,
        required: [true, 'El campo colonia es requerido']
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