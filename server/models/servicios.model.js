const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let servicioSchema = new Schema({

    vehiculo: {
        required: [true, "El vehiculo es requerido"],
        type: Schema.ObjectId,
        ref: "Vehiculos"
    },
    fecha: {
        type: String,
        required: [true, "La fecha es requerida"]
    },
    status: {
        type: String,
        default: "0"
    },
    trabajador: {
        type: Schema.ObjectId,
        required: [true, "El trabajador es requerido"],
        ref: "Trabajadores"
    }

});


module.exports = mongoose.model('Servicios', servicioSchema);