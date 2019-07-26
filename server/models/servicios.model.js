const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let serviciosSchema = new Schema({
    fecha: {
        type: String,
        required: [true, 'El campo fecha es requerido']
    },
    vehiculo: {
        type: Schema.ObjectId,
        required: [true, 'El campo vehiculo es requerido'],
        ref: 'Vehiculos'
    },
    estado: {
        type: String,
        required: [true, 'El campo estado es requerido']
    },
    trabajador: {
        type: Schema.ObjectId,
        required: [true, 'El campo vehiculo es requerido'],
        ref: 'Trabajadores'
    }
});

module.exports = mongoose.model('Servicios', serviciosSchema);