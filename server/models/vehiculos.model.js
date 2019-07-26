const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let vehiculosSchema = new Schema({
    placa: {
        type: String,
        required: [true, "El campo placa es requerida"]
    },
    marca: {
        type: Schema.ObjectId,
        required: [true, "El campo marca es requerida"],
        ref: "Marcas"
    },
    submarca: {
        type: String,
        required: [true, "El campo submarca es requerida"],
    },
    color: {
        type: String,
        required: [true, "El campo color es requerido"],
    },
    modelo: {
        type: String,
    },
    cliente: {
        type: Schema.ObjectId,
        required: [true, "El campo cliente es requerido"],
        ref: "Clientes"
    },
    motor: {
        type: String
    }
});


module.exports = mongoose.model('Vehiculos', vehiculosSchema);