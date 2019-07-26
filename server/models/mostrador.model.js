const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let mostradorSchema = new Schema({
    fecha: {
        type: String,
        required: [true, 'El campo fecha es requerido']
    }
});

module.exports = mongoose.model('Mostrador', mostradorSchema);