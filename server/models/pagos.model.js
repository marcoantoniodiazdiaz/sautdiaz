const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let pagosSchema = new Schema({
    movimiento: {
        type: Schema.ObjectId,
        required: [true, 'El campo movimiento es requerido'],
        ref: 'Movimientos'
    },
    servicio: {
        type: Schema.ObjectId,
        required: [true, 'El campo servicio es requerido'],
        ref: 'Servicios'
    }
});

module.exports = mongoose.model('Pagos', pagosSchema);