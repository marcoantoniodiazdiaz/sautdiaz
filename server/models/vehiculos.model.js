const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let vehiculosSchema = new Schema({
    placa: {
        type: String,
        required: [true, "La placa es requerida"]
    },
    marca: {
        type: Schema.ObjectId,
        required: [true, "La marca es requerida"],
        ref: "Marcas"
    },
    submarca: {
        type: String,
        required: [true, "La marca es requerida"]
    },
    color: {
        type: String,
        required: [true, "El color es requerido"]
    },
    cliente: {
        required: [true, "El cliente es requerido"],
        type: Schema.ObjectId,
        ref: "Usuario"
    }
});


module.exports = mongoose.model('Vehiculos', vehiculosSchema);