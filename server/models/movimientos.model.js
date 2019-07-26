const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let movimientosSchema = new Schema({
    fecha: {
        type: String,
        required: [true, "El campo fecha es requerido"]
    },
    cantidad: {
        type: String,
        required: [true, "El campo cantidad es requerido"]
    },
    cuenta: {
        type: String,
        required: [true, "El campo cuenta es requerido"]
    },
    descripcion: {
        type: String,
        required: [true, "El campo descripcion es requerido"]
    },
});

module.exports = mongoose.model('Movimientos', movimientosSchema);